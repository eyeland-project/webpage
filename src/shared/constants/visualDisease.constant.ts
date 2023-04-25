export const blindnessAcuities: VisualDisase[] = [
	{
		code: 'none',
		name: 'Ninguna'
	},
	{
		code: 'mild',
		name: 'Leve'
	},
	{
		code: 'moderate',
		name: 'Moderada'
	},
	{
		code: 'severe',
		name: 'Severa'
	},
	{
		code: 'blindness_4',
		name: 'Ceguera (categoría 4)'
	},
	{
		code: 'blindness_5',
		name: 'Ceguera (categoría 5)'
	},
	{
		code: 'blindness_6',
		name: 'Ceguera (categoría 6)'
	}
];

export const colorDeficiencies: VisualDisase[] = [
	{
		code: 'none',
		name: 'Ninguna'
	},
	{
		code: 'protanopia',
		name: 'Protanopía'
	},
	{
		code: 'protanomaly',
		name: 'Protanomalía'
	},
	{
		code: 'deuteranopia',
		name: 'Deuteranopía'
	},
	{
		code: 'deuteranomaly',
		name: 'Deuteranomalía'
	},
	{
		code: 'tritanopia',
		name: 'Tritanopía'
	},
	{
		code: 'tritanomaly',
		name: 'Tritanomalía'
	},
	{
		code: 'achromatopsia',
		name: 'Achromatopsia'
	},
	{
		code: 'achromatomaly',
		name: 'Achromatomalía'
	}
];

export const visualFieldDefects: VisualDisase[] = [
	{
		code: 'none',
		name: 'Ninguna'
	},
	{
		code: 'scotoma',
		name: 'Escotoma'
	},
	{
		code: 'quadrantanopia',
		name: 'Cuadrantanopsia'
	},
	{
		code: 'tunnel_vision',
		name: 'Visión de túnel'
	},
	{
		code: 'hemianopia_homonymous_left',
		name: 'Hemianopsia homónima izquierda'
	},
	{
		code: 'hemianopia_homonymous_right',
		name: 'Hemianopsia homónima derecha'
	},
	{
		code: 'hemianopia_heteronymous_binasal',
		name: 'Hemianopsia binasal'
	},
	{
		code: 'hemianopia_heteronymous_bitemporal',
		name: 'Hemianopsia bitemporal'
	}
];

interface VisualDisase {
	name: string;
	code: string;
}
