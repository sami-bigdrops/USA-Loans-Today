import React from 'react';

interface LinkItem {
  text: string;
  href: string;
}

interface DisclaimerProps {
  text: string;
  links: LinkItem[];
  className?: string;
}

const Disclaimer: React.FC<DisclaimerProps> = ({ text, links, className = '' }) => {
  // Split text by link texts and create parts
  const createTextParts = () => {
    const parts: React.ReactNode[] = [];
    let currentText = text;

    links.forEach((link, index) => {
      const linkIndexInText = currentText.indexOf(link.text);
      
      if (linkIndexInText !== -1) {
        // Add text before link
        const beforeLink = currentText.substring(0, linkIndexInText);
        if (beforeLink) {
          parts.push(beforeLink);
        }

        // Add link
        parts.push(
          <a
            key={`link-${index}`}
            href={link.href}
            className="text-[#D42C30] hover:underline font-medium transition-colors duration-200 hover:text-[#B0262A]"
          >
            {link.text}
          </a>
        );

        // Update currentText to after this link
        currentText = currentText.substring(linkIndexInText + link.text.length);
      }
    });

    // Add remaining text
    if (currentText) {
      parts.push(currentText);
    }

    return parts;
  };

  return (
    <p
      className={`
        text-xs sm:text-sm text-[--text] text-center
        leading-relaxed
        ${className}
      `}
    >
      {createTextParts().map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </p>
  );
};

export default Disclaimer;

