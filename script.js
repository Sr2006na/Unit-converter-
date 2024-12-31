const conversionFactors = {
    temperature: {
        Celsius: { Celsius: 1, Fahrenheit: (value) => (value * 9/5) + 32, Kelvin: (value) => value + 273.15 },
        Fahrenheit: { Celsius: (value) => (value - 32) * 5/9, Fahrenheit: 1, Kelvin: (value) => (value - 32) * 5/9 + 273.15 },
        Kelvin: { Celsius: (value) => value - 273.15, Fahrenheit: (value) => (value - 273.15) * 9/5 + 32, Kelvin: 1 }
    },
    area: {
        'Square Kilometre': { 
            'Square Kilometre': 1, 
            'Square Metre': 1e6, 
            'Square Mile': 0.386102, 
            'Square Yard': 1195990, 
            'Square Foot': 10763910, 
            'Square Inch': 15500031, 
            'Hectare': 100, 
            'Acre': 247.105 
        },
        'Square Metre': { 
            'Square Kilometre': 1e-6, 
            'Square Metre': 1, 
            'Square Mile': 3.861e-7, 
            'Square Yard': 1.19599, 
            'Square Foot': 10.7639, 
            'Square Inch': 1550.0031, 
            'Hectare': 0.0001, 
            'Acre': 0.000247105 
        },
        'Square Mile': { 
            'Square Kilometre': 2.58999, 
            'Square Metre': 2589988, 
            'Square Mile': 1, 
            'Square Yard': 3097600, 
            'Square Foot': 27878400, 
            'Square Inch': 4014489600, 
            'Hectare': 258.998, 
            'Acre': 640 
        },
        'Square Yard': { 
            'Square Kilometre': 8.3613e-7, 
            'Square Metre': 0.836127, 
            'Square Mile': 3.228e-7, 
            'Square Yard': 1, 
            'Square Foot': 9, 
            'Square Inch': 1296, 
            'Hectare': 0.0000836127, 
            'Acre': 0.000206612 
        },
        'Square Foot': { 
            'Square Kilometre': 9.2903e-6, 
            'Square Metre': 0.092903, 
            'Square Mile': 3.587e-8, 
            'Square Yard': 0.111111, 
            'Square Foot': 1, 
            'Square Inch': 144, 
            'Hectare': 0.0000092903, 
            'Acre': 0.0000229568 
        },
        'Square Inch': { 
            'Square Kilometre': 6.4516e-10, 
            'Square Metre': 0.00064516, 
            'Square Mile': 2.491e-10, 
            'Square Yard': 0.000771605, 
            'Square Foot': 0.00694444, 
            'Square Inch': 1, 
            'Hectare': 0.000000064516, 
            'Acre': 0.000000159 
        },
        'Hectare': { 
            'Square Kilometre': 0.01, 
            'Square Metre': 10000, 
            'Square Mile': 0.003861, 
            'Square Yard': 11959.9, 
            'Square Foot': 107639, 
            'Square Inch': 15500000, 
            'Hectare': 1, 
            'Acre': 2.47105 
        },
        'Acre': { 
            'Square Kilometre': 0.00404686, 
            'Square Metre': 4046.86, 
            'Square Mile': 0.0015625, 
            'Square Yard': 4840, 
            'Square Foot': 43560, 
            'Square Inch': 6272640, 
            'Hectare': 0.404686 
        }
    },
    weight: {
        Gram: { Gram: 1, Kilogram: 0.001, Milligram: 1000, 'Metric Ton': 0.000001, 'Long Ton': 0.0000009842065276, 'Short Ton': 0.00000110231131, Pound: 0.00220462, Ounce: 0.035274, Carat: 5000 },
        Kilogram: { Gram: 1000, Kilogram: 1, Milligram: 1e6, 'Metric Ton': 0.001, 'Long Ton': 0.000984207, 'Short Ton': 0.00110231, Pound: 2.20462, Ounce: 35.274, Carat: 5000000 },
        Milligram: { Gram: 0.001, Kilogram: 0.000001, Milligram: 1, 'Metric Ton': 1e-9, 'Long Ton': 9.84207e-10, 'Short Ton': 1.10231e-9, Pound: 0.00000220462, Ounce: 0.000035274, Carat: 5 },
        'Metric Ton': { Gram: 1e6, Kilogram: 1000, Milligram: 1e9, 'Metric Ton': 1, 'Long Ton': 0.984207, 'Short Ton': 1.10231, Pound: 2204.62, Ounce: 35274, Carat: 5e9 },
        'Long Ton': { Gram: 1016046.91, Kilogram: 1016.05, Milligram: 1.01605e9, 'Metric Ton': 1.01605, 'Long Ton': 1, 'Short Ton': 1.12, Pound: 2240, Ounce: 35840, Carat: 5.08e9 },
        'Short Ton': { Gram: 907184.74, Kilogram: 907.185, Milligram: 9.07185e8, 'Metric Ton': 0.907185, 'Long Ton': 0.892857, 'Short Ton': 1, Pound: 2000, Ounce: 32000, Carat: 4.536e9 },
        Pound: { Gram: 453.592, Kilogram: 0.453592, Milligram: 453592, 'Metric Ton': 0.000453592, 'Long Ton': 0.000446429, 'Short Ton': 0.0005, Pound: 1, Ounce: 16, Carat: 2267960 },
        Ounce: { Gram: 28.3495, Kilogram: 0.0283495, Milligram: 28349.5, 'Metric Ton': 0.0000283495, 'Long Ton': 0.0000279018, 'Short Ton': 0.00003125, Pound: 0.0625, Ounce: 1, Carat: 141748 },
        Carat: { Gram: 0.2, Kilogram: 0.0002, Milligram: 200, 'Metric Ton': 2e-7, 'Long Ton': 1.96841e-7, 'Short Ton': 2.20462e-7, Pound: 0.000440925, Ounce: 0.00705479, Carat: 1 }
    },
    length: {
        Meter: { Meter: 1, Kilometer: 0.001, Centimeter: 100, Millimeter: 1000, Micrometer: 1e6, Mile: 0.000621371, Yard: 1.09361, Foot: 3.28084, Inch: 39.3701 },
        Kilometer: { Meter: 1000, Kilometer: 1, Centimeter: 1e5, Millimeter: 1e6, Micrometer: 1e9, Mile: 0.621371, Yard: 1093.61, Foot: 3280.84, Inch: 39370.1 },
        Centimeter: { Meter: 0.01, Kilometer: 0.00001, Centimeter: 1, Millimeter: 10, Micrometer: 10000, Mile: 0.00000621371, Yard: 0.0109361, Foot: 0.0328084, Inch: 0.393701 },
        Millimeter: { Meter: 0.001, Kilometer: 0.000001, Centimeter: 0.1, Millimeter: 1, Micrometer: 1000, Mile: 0.000000621371, Yard: 0.00109361, Foot: 0.00328084, Inch: 0.0393701 },
        Micrometer: { Meter: 0.000001, Kilometer: 1e-9, Centimeter: 0.0001, Millimeter: 0.001, Micrometer: 1, Mile: 6.21371e-10, Yard: 0.00000109361, Foot: 0.00000328084, Inch: 0.0000393701 },
        Mile: { Meter: 1609.34, Kilometer: 1.60934, Centimeter: 160934, Millimeter: 1.60934e6, Micrometer: 1.60934e9, Mile: 1, Yard: 1760, Foot: 5280, Inch: 63360 },
        Yard: { Meter: 0.9144, Kilometer: 0.0009144, Centimeter: 91.44, Millimeter: 914.4, Micrometer: 914400, Mile: 0.000568182, Yard: 1, Foot: 3, Inch: 36 },
        Foot: { Meter: 0.3048, Kilometer: 0.0003048, Centimeter: 30.48, Millimeter: 304.8, Micrometer: 304800, Mile: 0.000189394, Yard: 0.333333, Foot: 1, Inch: 12 },
        Inch: { Meter: 0.0254, Kilometer: 0.0000254, Centimeter: 2.54, Millimeter: 25.4, Micrometer: 25400, Mile: 0.0000157828, Yard: 0.0277778, Foot: 0.0833333, Inch: 1 }
    },
    time: {
        Second: { Second: 1, Millisecond: 1000, Minute: 0.0166667, Hour: 0.000277778, Day: 1.15741e-5, Week: 1.65344e-6, Month: 3.80517e-7, Year: 3.17098e-8 },
        Millisecond: { Second: 0.001, Millisecond: 1, Minute: 0.0000166667, Hour: 2.77778e-7, Day: 1.15741e-8, Week: 1.65344e-9, Month: 3.80517e-10, Year: 3.17098e-11 },
        Minute: { Second: 60, Millisecond: 60000, Minute: 1, Hour: 0.0166667, Day: 0.000694444, Week: 0.0000992063, Month: 0.000022831, Year: 0.00000190259 },
        Hour: { Second: 3600, Millisecond: 3.6e6, Minute: 60, Hour: 1, Day: 0.0416667, Week: 0.00595238, Month: 0.00136986, Year: 0.000114155 },
        Day: { Second: 86400, Millisecond: 8.64e7, Minute: 1440, Hour: 24, Day: 1, Week: 0.142857, Month: 0.0328767, Year: 0.00273973 },
        Week: { Second: 604800, Millisecond: 6.048e8, Minute: 10080, Hour: 168, Day: 7, Week: 1, Month: 0.230137, Year: 0.0191781 },
        Month: { Second: 2628000, Millisecond: 2.628e9, Minute: 43800, Hour: 730, Day: 30.4167, Week: 4.34524, Month: 1, Year: 0.0833333 },
        Year: { Second: 31536000, Millisecond: 3.1536e10, Minute: 525600, Hour: 8760, Day: 365, Week: 52.1429, Month: 12, Year: 1 }
    },
    energy: {
        Joule: { Joule: 1, Kilojoule: 0.001, Calorie: 0.239006, 'Kilocalorie': 0.000239006, 'Electronvolt': 6.242e18, 'British Thermal Unit': 0.000947817, 'Foot-pound': 0.737562 },
        Kilojoule: { Joule: 1000, Kilojoule: 1, Calorie: 239.006, 'Kilocalorie': 0.239006, 'Electronvolt': 6.242e21, 'British Thermal Unit': 0.947817, 'Foot-pound': 737.562 },
        Calorie: { Joule: 4.184, Kilojoule: 0.004184, Calorie: 1, 'Kilocalorie': 0.001, 'Electronvolt': 2.613e19, 'British Thermal Unit': 0.00396567, 'Foot-pound': 3.08596 },
        Kilocalorie: { Joule: 4184, Kilojoule: 4.184, Calorie: 1000, 'Kilocalorie': 1, 'Electronvolt': 2.613e22, 'British Thermal Unit': 3.96567, 'Foot-pound': 3085.96 },
        Electronvolt: { Joule: 1.60218e-19, Kilojoule: 1.60218e-22, Calorie: 3.82673e-20, 'Kilocalorie': 3.82673e-23, 'Electronvolt': 1, 'British Thermal Unit': 1.51857e-22, 'Foot-pound': 1.18171e-19 },
        'British Thermal Unit': { Joule: 1055.06, Kilojoule: 1.05506, Calorie: 252.164, 'Kilocalorie': 0.252164, 'Electronvolt': 6.585e21, 'British Thermal Unit': 1, 'Foot-pound': 778.169 },
        'Foot-pound': { Joule: 1.35582, Kilojoule: 0.00135582, Calorie: 0.323832, 'Kilocalorie': 0.000323832, 'Electronvolt': 8.462e18, 'British Thermal Unit': 0.00128507, 'Foot-pound': 1 }
    },
    frequency: {
        Hertz: { Hertz: 1, Kilohertz: 0.001, Megahertz: 0.000001, Gigahertz: 1e-9, 'Revolutions per Minute': 60 },
        Kilohertz: { Hertz: 1000, Kilohertz: 1, Megahertz: 0.001, Gigahertz: 0.000001, 'Revolutions per Minute': 60000 },
        Megahertz: { Hertz: 1e6, Kilohertz: 1000, Megahertz: 1, Gigahertz: 0.001, 'Revolutions per Minute': 6e7 },
        Gigahertz: { Hertz: 1e9, Kilohertz: 1e6, Megahertz: 1000, Gigahertz: 1, 'Revolutions per Minute': 6e10 },
        'Revolutions per Minute': { Hertz: 0.0166667, Kilohertz: 0.0000166667, Megahertz: 1.66667e-8, Gigahertz: 1.66667e-11, 'Revolutions per Minute': 1 }
    },
    pressure: {
        Pascal: { Pascal: 1, Kilopascal: 0.001, Megapascal: 1e-6, Bar: 1e-5, 'Atmosphere': 9.86923e-6, 'Millimeter of Mercury': 0.00750062, 'Pound per Square Inch': 0.000145038 },
        Kilopascal: { Pascal: 1000, Kilopascal: 1, Megapascal: 0.001, Bar: 0.01, 'Atmosphere': 0.00986923, 'Millimeter of Mercury': 7.50062, 'Pound per Square Inch': 0.145038 },
        Megapascal: { Pascal: 1e6, Kilopascal: 1000, Megapascal: 1, Bar: 10, 'Atmosphere': 9.86923, 'Millimeter of Mercury': 7500.62, 'Pound per Square Inch': 145.038 },
        Bar: { Pascal: 1e5, Kilopascal: 100, Megapascal: 0.1, Bar: 1, 'Atmosphere': 0.986923, 'Millimeter of Mercury': 750.062, 'Pound per Square Inch': 14.5038 },
        Atmosphere: { Pascal: 101325, Kilopascal: 101.325, Megapascal: 0.101325, Bar: 1.01325, 'Atmosphere': 1, 'Millimeter of Mercury': 760, 'Pound per Square Inch': 14.6959 },
        'Millimeter of Mercury': { Pascal: 133.322, Kilopascal: 0.133322, Megapascal: 0.000133322, Bar: 0.00133322, 'Atmosphere': 0.00131579, 'Millimeter of Mercury': 1, 'Pound per Square Inch': 0.0193368 },
        'Pound per Square Inch': { Pascal: 6894.76, Kilopascal: 6.89476, Megapascal: 0.00689476, Bar: 0.0689476, 'Atmosphere': 0.068046, 'Millimeter of Mercury': 51.7149, 'Pound per Square Inch': 1 }
    },
    volume: {
        'Cubic Meter': { 'Cubic Meter': 1, 'Cubic Centimeter': 1e6, Liter: 1000, 'Milliliter': 1e6, 'Cubic Foot': 35.3147, 'Cubic Inch': 61023.7, Gallon: 264.172, Quart: 1056.69, Pint: 2113.38, 'Fluid Ounce': 33814 },
        'Cubic Centimeter': { 'Cubic Meter': 1e-6, 'Cubic Centimeter': 1, Liter: 0.001, 'Milliliter': 1, 'Cubic Foot': 0.0000353147, 'Cubic Inch': 0.0610237, Gallon: 0.000264172, Quart: 0.00105669, Pint: 0.00211338, 'Fluid Ounce': 0.033814 },
        Liter: { 'Cubic Meter': 0.001, 'Cubic Centimeter': 1000, Liter: 1, 'Milliliter': 1000, 'Cubic Foot': 0.0353147, 'Cubic Inch': 61.0237, Gallon: 0.264172, Quart: 1.05669, Pint: 2.11338, 'Fluid Ounce': 33.814 },
        'Milliliter': { 'Cubic Meter': 1e-6, 'Cubic Centimeter': 1, Liter: 0.001, 'Milliliter': 1, 'Cubic Foot': 0.0000353147, 'Cubic Inch': 0.0610237, Gallon: 0.000264172, Quart: 0.00105669, Pint: 0.00211338, 'Fluid Ounce': 0.033814 },
        'Cubic Foot': { 'Cubic Meter': 0.0283168, 'Cubic Centimeter': 28316.8, Liter: 28.3168, 'Milliliter': 28316.8, 'Cubic Foot': 1, 'Cubic Inch': 1728, Gallon: 7.48052, Quart: 29.9221, Pint: 59.8442, 'Fluid Ounce': 957.506 },
        'Cubic Inch': { 'Cubic Meter': 0.0000163871, 'Cubic Centimeter': 16.3871, Liter: 0.0163871, 'Milliliter': 16.3871, 'Cubic Foot': 0.000578704, 'Cubic Inch': 1, Gallon: 0.004329, Quart: 0.017316, Pint: 0.034632, 'Fluid Ounce': 0.554113 },
        Gallon: { 'Cubic Meter': 0.00378541, 'Cubic Centimeter': 3785.41, Liter: 3.78541, 'Milliliter': 3785.41, 'Cubic Foot': 0.133681, 'Cubic Inch': 231, Gallon: 1, Quart: 4, Pint: 8, 'Fluid Ounce': 128 },
        Quart: { 'Cubic Meter': 0.000946353, 'Cubic Centimeter': 946.353, Liter: 0.946353, 'Milliliter': 946.353, 'Cubic Foot': 0.0334201, 'Cubic Inch': 57.75, Gallon: 0.25, Quart: 1, Pint: 2, 'Fluid Ounce': 32 },
        Pint: { 'Cubic Meter': 0.000473176, 'Cubic Centimeter': 473.176, Liter: 0.473176, 'Milliliter': 473.176, 'Cubic Foot': 0.0167101, 'Cubic Inch': 28.875, Gallon: 0.125, Quart: 0.5, Pint: 1, 'Fluid Ounce': 16 },
        'Fluid Ounce': { 'Cubic Meter': 0.0000295735, 'Cubic Centimeter': 29.5735, Liter: 0.0295735, 'Milliliter': 29.5735, 'Cubic Foot': 0.00104438, 'Cubic Inch': 1.80469, Gallon: 0.0078125, Quart: 0.03125, Pint: 0.0625, 'Fluid Ounce': 1 }
    },
    speed: {
        'Meter per Second': { 'Meter per Second': 1, 'Kilometer per Hour': 3.6, 'Mile per Hour': 2.23694, Knot: 1.94384, 'Foot per Second': 3.28084 },
        'Kilometer per Hour': { 'Meter per Second': 0.277778, 'Kilometer per Hour': 1, 'Mile per Hour': 0.621371, Knot: 0.539957, 'Foot per Second': 0.911344 },
        'Mile per Hour': { 'Meter per Second': 0.44704, 'Kilometer per Hour': 1.60934, 'Mile per Hour': 1, Knot: 0.868976, 'Foot per Second': 1.46667 },
        Knot: { 'Meter per Second': 0.514444, 'Kilometer per Hour': 1.852, 'Mile per Hour': 1.15078, Knot: 1, 'Foot per Second': 1.68781 },
        'Foot per Second': { 'Meter per Second': 0.3048, 'Kilometer per Hour': 1.09728, 'Mile per Hour': 0.681818, Knot: 0.592484, 'Foot per Second': 1 }
    }
};

function showConversionForm() {
    const category = document.getElementById('category').value;
    const form = document.getElementById('conversion-form');
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');

    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    if (category) {
        form.style.display = 'block';
        const units = Object.keys(conversionFactors[category]);
        units.forEach(unit => {
            fromUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
            toUnitSelect.innerHTML += `<option value="${unit}">${unit}</option>`;
        });
    } else {
        form.style.display = 'none';
    }
}

function convert() {
    const category = document.getElementById('category').value;
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultDiv = document.getElementById('result');

    if (!isNaN(value) && category && fromUnit && toUnit) {
        const conversionFactor = conversionFactors[category][fromUnit][toUnit];
        const result = typeof conversionFactor === 'function' ? conversionFactor(value) : value * conversionFactor;

        
        let formattedResult;
        if (Math.abs(result) < 0.001 && result !== 0) {
            formattedResult = result.toExponential(2); 
        } else {
            formattedResult = result.toFixed(4); 
        }

        
        let explanation;
        if (typeof conversionFactor === 'function') {
            explanation = `Formula: ${conversionFactor.toString()}`;
        } else {
            explanation = `Formula: ${value} ${fromUnit} × ${conversionFactor} = ${formattedResult} ${toUnit}`;
        }

        
        resultDiv.innerHTML = `
            <strong>Result:</strong> ${formattedResult} ${toUnit}<br>
            <strong>How it was done:</strong> ${explanation}
        `;
    } else {
        resultDiv.innerHTML = 'Please enter a valid value and select units.';
    }
                       }
