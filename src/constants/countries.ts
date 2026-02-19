export const COUNTRIES = [
    { label: "🇦🇺 Australia", value: "AU" },
    { label: "🇧🇪 Belgium", value: "BE" },
    { label: "🇧🇷 Brazil", value: "BR" },
    { label: "🇨🇦 Canada", value: "CA" },
    { label: "🇨🇳 China", value: "CN" },
    { label: "🇩🇰 Denmark", value: "DK" },
    { label: "🇫🇮 Finland", value: "FI" },
    { label: "🇫🇷 France", value: "FR" },
    { label: "🇩🇪 Germany", value: "DE" },
    { label: "🇭🇰 Hong Kong", value: "HK" },
    { label: "🇮🇳 India", value: "IN" },
    { label: "🇮🇩 Indonesia", value: "ID" },
    { label: "🇮🇪 Ireland", value: "IE" },
    { label: "🇮🇹 Italy", value: "IT" },
    { label: "🇯🇵 Japan", value: "JP" },
    { label: "🇰🇷 Korea", value: "KR" },
    { label: "🇱🇺 Luxembourg", value: "LU" },
    { label: "🇲🇽 Mexico", value: "MX" },
    { label: "🇳🇱 Netherlands", value: "NL" },
    { label: "🇳🇿 New Zealand", value: "NZ" },
    { label: "🇳🇴 Norway", value: "NO" },
    { label: "🇵🇹 Portugal", value: "PT" },
    { label: "🇸🇬 Singapore", value: "SG" },
    { label: "🇿🇦 South Africa", value: "ZA" },
    { label: "🇪🇸 Spain", value: "ES" },
    { label: "🇸🇪 Sweden", value: "SE" },
    { label: "🇨🇭 Switzerland", value: "CH" },
    { label: "🇹🇭 Thailand", value: "TH" },
    { label: "🇦🇪 United Arab Emirates", value: "AE" },
    { label: "🇬🇧 United Kingdom", value: "GB" },
    { label: "🇺🇸 United States", value: "US" },
    { label: "🌍 Others", value: "OTHER" }
];

export const getCountryDisplay = (countryLabel: string) => {
    // If it's already an ISO code, find it
    const country = COUNTRIES.find(c => c.value === countryLabel || c.label === countryLabel);
    if (!country) return countryLabel;

    // Extract emoji from label
    const emoji = country.label.split(' ')[0];
    return `${emoji} ${country.value}`;
};
