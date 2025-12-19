import * as cheerio from "cheerio";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const routingParam = searchParams.get("routing") ?? "";

  const routing = routingParam.replace(/\D/g, "");

  if (!/^\d{9}$/.test(routing)) {
    return Response.json(
      { error: "Invalid routing number" },
      { status: 400 }
    );
  }

  const wiseBaseUrl = process.env.WISE_BASE_URL ?? '';
  const url = `${wiseBaseUrl}/${routing}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    return Response.json(
      { error: "Failed to fetch Wise page" },
      { status: 502 }
    );
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  // Equivalent of: soup.find("h1").get_text(strip=True)
  let bankName = $("h1").first().text().trim();

  if (!bankName) {
    return Response.json(
      { error: "Bank name not found (page structure changed)" },
      { status: 404 }
    );
  }

  // Clean up bank name: remove "Routing Number" and everything after it
  // Example: "JP MORGAN CHASE BANK, NA Routing Number FL - 083006102" -> "JP MORGAN CHASE BANK, NA"
  const routingNumberIndex = bankName.toLowerCase().indexOf('routing number');
  if (routingNumberIndex !== -1) {
    bankName = bankName.substring(0, routingNumberIndex).trim();
  }

  // Remove trailing commas and spaces
  bankName = bankName.replace(/[,\s]+$/, '').trim();

  return Response.json({
    routingNumber: routing,
    bankName,
  });
}

