// Email service disabled - all code commented out
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Email service is disabled'
    },
    { status: 503 }
  )
}