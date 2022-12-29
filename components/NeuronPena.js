import Neuron from "./Neuron";

// თემო ლომსაძე - "ნეირონული ქსელების" ლაბორატორიული პროექტი / დავალება

// ნეირონული ინდივიდუალური ფენა
export default class NeuronLayer {
	constructor(quantityInHidden, numInputs) {

        this.neurons = [];

		for (let i = 0; i < quantityInHidden; ++i) {

			let newNeuron = new Neuron(numInputs);	
			this.neurons.push(newNeuron);

		}
	}
}