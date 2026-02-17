import Script from "next/script";
import type { Organization, WebSite, WithContext, SearchAction } from "schema-dts";

export function JsonLd() {
    const organization: WithContext<Organization> = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Rofaar",
        "url": "https://rofaar.com",
        "logo": "https://rofaar.com/logo.png", // Update with actual logo URL
        "sameAs": [
            "https://instagram.com/rofaar",
            "https://twitter.com/rofaar"
        ],
        "description": "Elevating Islamic lifestyle goods beyond the generic. A curated marketplace for the productive believer."
    };

    const website: WithContext<WebSite> = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Rofaar",
        "url": "https://rofaar.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://rofaar.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        } as SearchAction & { "query-input"?: string }
    };

    return (
        <>
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
            />
            <Script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
            />
        </>
    );
}
