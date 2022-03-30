import type { Theme } from '$lib/data-access/themes/themes.types'

export const theme: Theme = {
	path: null,
	class: "grid [grid-template-areas:'header''content']",
	tag: 'div',
	containers: [
		{
			path: null,
			class: '[grid-area:header] w-full flex flex-col gap-2 mb-8',
			tag: 'header',
			containers: [
				{
					path: '$.basics.name',
					class: 'uppercase text-gray-900 text-3xl font-semibold',
					tag: 'h1',
				},
				{
					path: null,
					class: 'flex gap-8',
					tag: 'div',
					containers: [
						{
							path: null,
							class: 'flex gap-8',
							tag: 'div',
							containers: [
								{
									path: '$.basics.email',
									class: 'text-gray-700 w-fit',
									tag: 'span',
								},
								{
									path: '$.basics.phone',
									class: 'text-gray-700 w-fit',
									tag: 'span',
								},
								{
									path: '$.basics.location.city[[,  ]]$.basics.location.countryCode',
									class: 'text-gray-700 w-fit',
									tag: 'span',
								},
							],
						},
					],
				},
			],
		},
		{
			path: null,
			class: '[grid-area:content] flex flex-col gap-8',
			tag: 'div',
			containers: [
				{
					path: null,
					class: 'work-experience resume-section',
					tag: 'article',
					containers: [
						{
							path: null,
							class: 'work-experience-header resume-section-header uppercase text-gray-600 font-medium tracking-wider text-lg w-full border-b border-gray-200 mb-1',
							tag: 'header',
							containers: [
								{
									path: '[[Work Experience]]',
									class: null,
									tag: 'h2',
								},
							],
						},
						{
							path: '$.work',
							class: 'work-experience-list flex flex-col gap-5',
							tag: 'ul',
							containers: [
								{
									path: null,
									class: 'work-exp-item-li',
									tag: 'li',
									containers: [
										{
											path: null,
											class: 'work-exp-item',
											tag: 'article',
											containers: [
												{
													path: null,
													class: 'work-exp-item-header mb-1',
													tag: 'header',
													containers: [
														{
															path: null,
															class: 'name-dates-container flex justify-between items-baseline',
															tag: 'div',
															containers: [
																{
																	path: null,
																	class: 'font-medium w-fit flex gap-2 text-base text-gray-500 ',
																	tag: 'h3',
																	containers: [
																		{
																			attributes: {
																				href: '$.work[{{index}}].url',
																				target: '[[_blank]]',
																			},
																			path: '$.work[{{index}}].name',
																			class: null,
																			tag: 'a',
																		},
																	],
																},
																{
																	path: null,
																	class: 'text-sm text-gray-500 italic w-fit flex gap-2',
																	tag: 'span',
																	containers: [
																		{
																			attributes: {
																				datetime:
																					'$.work[{{index}}].startDate',
																			},
																			path: '$.work[{{index}}].startDate',
																			class: null,
																			tag: 'time',
																		},
																		{
																			path: '[[-]]',
																			class: null,
																			tag: 'span',
																		},
																		{
																			attributes: {
																				datetime:
																					'$.work[{{index}}].endDate',
																			},
																			path: '$.work[{{index}}].endDate',
																			class: null,
																			tag: 'time',
																		},
																	],
																},
															],
														},
														{
															path: null,
															class: 'position-location-container flex justify-between items-baseline',
															tag: 'div',
															containers: [
																{
																	path: null,
																	class: 'flex gap-2 text-base text-gray-900 font-semibold w-fit',
																	tag: 'span',
																	containers: [
																		{
																			path: '$.work[{{index}}].position',
																			class: 'font-semibold w-fit',
																			tag: 'span',
																		},
																		{
																			path: '[[-]]',
																			class: 'font-base w-fit',
																			tag: 'span',
																		},
																		{
																			path: '$.work[{{index}}].summary',
																			class: 'font-semibold w-fit',
																			tag: 'span',
																		},
																	],
																},
																{
																	path: '$.work[{{index}}].location',
																	class: 'text-sm text-gray-500 italic w-fit',
																	tag: 'span',
																},
															],
														},
													],
												},
												{
													path: '$.work[{{index}}].highlights',
													class: 'work-exp-item-highlights list-disc ml-8',
													tag: 'ul',
													containers: [
														{
															path: '$.work[{{index}}].highlights[{{index}}]',
															class: 'work-exp-item-highlight text-body text-gray-900',
															tag: 'li',
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					path: null,
					tag: 'article',
					class: 'skills-and-certifications resume-section',
					containers: [
						{
							path: null,
							class: 'skills-and-certifications-header resume-section-header uppercase text-gray-600 font-medium tracking-wider text-lg w-full border-b border-gray-200 mb-1',
							tag: 'header',
							containers: [
								{
									path: '[[Skills & Certifications]]',
									class: null,
									tag: 'h2',
								},
							],
						},
						{
							path: '$.certificates',
							tag: 'ul',
							class: 'education-list flex-col list-disc ml-8',
							containers: [
								{
									path: null,
									class: 'education-item-li',
									tag: 'li',
									containers: [
										{
											path: null,
											class: 'education-item flex',
											tag: 'article',
											containers: [
												{
													attributes: {
														href: '$.certificates[{{index}}].url',
														target: '[[_blank]]',
													},
													path: '$.certificates[{{index}}].name',
													class: null,
													tag: 'a',
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					path: null,
					class: 'education resume-section',
					tag: 'article',
					containers: [
						{
							path: null,
							class: 'education-header resume-section-header uppercase text-gray-600 font-medium tracking-wider text-lg w-full border-b border-gray-200 mb-1',
							tag: 'header',
							containers: [
								{
									path: '[[Education]]',
									class: null,
									tag: 'h2',
								},
							],
						},
						{
							path: '$.education',
							class: 'education-list flex flex-col gap-5',
							tag: 'ul',
							containers: [
								{
									path: null,
									class: 'education-item-li',
									tag: 'li',
									containers: [
										{
											path: null,
											class: 'education-item',
											tag: 'article',
											containers: [
												{
													path: null,
													class: 'education-item-header mb-1',
													tag: 'header',
													containers: [
														{
															path: null,
															class: 'name-dates-container flex justify-between items-baseline',
															tag: 'div',
															containers: [
																{
																	path: null,
																	class: 'font-medium w-fit flex gap-2 text-base text-gray-500 ',
																	tag: 'h3',
																	containers: [
																		{
																			attributes: {
																				href: '$.education[{{index}}].url',
																				target: '[[_blank]]',
																			},
																			path: '$.education[{{index}}].institution',
																			class: null,
																			tag: 'a',
																		},
																	],
																},
																{
																	path: null,
																	class: 'text-sm text-gray-500 italic w-fit flex gap-2',
																	tag: 'span',
																	containers: [
																		{
																			attributes: {
																				datetime:
																					'$.education[{{index}}].startDate',
																			},
																			path: '$.education[{{index}}].startDate',
																			class: null,
																			tag: 'time',
																		},
																		{
																			path: '[[-]]',
																			class: null,
																			tag: 'span',
																		},
																		{
																			attributes: {
																				datetime:
																					'$.education[{{index}}].endDate',
																			},
																			path: '$.education[{{index}}].endDate',
																			class: null,
																			tag: 'time',
																		},
																	],
																},
															],
														},
														{
															path: null,
															class: 'position-location-container flex justify-between items-baseline',
															tag: 'div',
															containers: [
																{
																	path: null,
																	class: 'flex gap-2 text-base text-gray-900 font-semibold w-fit',
																	tag: 'span',
																	containers: [
																		{
																			path: '$.education[{{index}}].studyType[[  ]]$.education[{{index}}].area',
																			class: 'font-semibold w-fit',
																			tag: 'span',
																		},
																	],
																},
																{
																	path: '$.education[{{index}}].location',
																	class: 'text-sm text-gray-500 italic w-fit',
																	tag: 'span',
																},
															],
														},
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
			],
		},
	],
}
