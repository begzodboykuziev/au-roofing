import Script from 'next/script'

export default function StructuredData() {
	const businessSchema = {
		'@context': 'https://schema.org',
		'@type': 'RoofingContractor',
		name: 'AU Roofing',
		description:
			'Professional roof leak repair Sydney specialists. 24/7 emergency leaking roof repair services across Eastern Suburbs, Western Sydney, North Sydney & Inner West.',
		url: 'https://auroofing.net.au',
		telephone: '0449974797',
		email: 'info@auroofing.com.au',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Sydney',
			addressRegion: 'NSW',
			addressCountry: 'AU',
		},
		geo: {
			'@type': 'GeoCoordinates',
			latitude: -33.8688,
			longitude: 151.2093,
		},
		areaServed: [
			{
				'@type': 'City',
				name: 'Sydney',
				sameAs: 'https://en.wikipedia.org/wiki/Sydney',
			},
			{
				'@type': 'Place',
				name: 'Eastern Suburbs Sydney',
			},
			{
				'@type': 'Place',
				name: 'Western Sydney',
			},
			{
				'@type': 'Place',
				name: 'North Sydney',
			},
			{
				'@type': 'Place',
				name: 'Inner West Sydney',
			},
			{
				'@type': 'Place',
				name: 'Northern Beaches Sydney',
			},
			{
				'@type': 'Place',
				name: 'Hills District Sydney',
			},
		],
		serviceType: [
			'Roof Leak Repair',
			'Emergency Roof Repair',
			'Roof Leak Detection',
			'Ceiling Leak Repair',
			'Gutter Leak Repair',
			'Storm Damage Roof Repair',
			'Waterproofing',
			'24/7 Emergency Roof Repairs',
		],
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Roof Leak Repair Services',
			itemListElement: [
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Emergency Roof Leak Repair Sydney',
						description:
							'24/7 emergency roof leak repair Sydney services across all suburbs',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Roof Leak Detection Sydney',
						description:
							'Professional roof leak detection using advanced technology',
					},
				},
				{
					'@type': 'Offer',
					itemOffered: {
						'@type': 'Service',
						name: 'Ceiling Leak Repair Sydney',
						description:
							'Expert ceiling leak repair and water damage restoration',
					},
				},
			],
		},
		openingHours: 'Mo-Su 00:00-23:59',
		priceRange: '$$',
		paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
		currenciesAccepted: 'AUD',
	}

	const breadcrumbSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://auroofing.net.au',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Roof Leak Repair Sydney',
				item: 'https://auroofing.net.au#services',
			},
		],
	}

	const faqSchema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: [
			{
				'@type': 'Question',
				name: 'How much does roof leak repair cost Sydney?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Roof leak repair costs in Sydney vary depending on the extent of damage. Our licensed roof leak repair contractors provide free quotes and affordable rates across Sydney.',
				},
			},
			{
				'@type': 'Question',
				name: 'Do you provide 24 hour roof leak repair Sydney?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'Yes, we provide 24/7 emergency roof leak repair Sydney services. Our roof leak specialists are available around the clock for urgent leaking roof repairs.',
				},
			},
			{
				'@type': 'Question',
				name: 'Which areas do you cover for roof leak repair?',
				acceptedAnswer: {
					'@type': 'Answer',
					text: 'We provide roof leak repair services across all Sydney areas including Eastern Suburbs, Western Sydney, North Sydney, Inner West Sydney, Northern Beaches, and Hills District.',
				},
			},
		],
	}

	return (
		<>
			<Script
				id='business-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(businessSchema),
				}}
			/>
			<Script
				id='breadcrumb-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbSchema),
				}}
			/>
			<Script
				id='faq-schema'
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(faqSchema),
				}}
			/>
		</>
	)
}
