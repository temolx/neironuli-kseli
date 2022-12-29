// ინდივიდუალური ნეირონი
export default class Neuron {
	constructor(inputs) {
        this.inputs = inputs;
        this.weights = [];
				
		for (let i = 0; i < inputs + 1; ++i) {

			let newWeight = -1 + (Math.random()*2);
			this.weights.push(newWeight);

		}
	}
}

// თემო ლომსაძე - "ნეირონული ქსელების" ლაბორატორიული პროექტი / დავალება