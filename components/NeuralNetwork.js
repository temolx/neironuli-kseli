import NeuronPena from "./NeuronPena";

// თემო ლომსაძე - "ნეირონული ქსელების" ლაბორატორიული პროექტი / დავალება

export default class NeuralNetwork {    
    constructor(numInputs, numOutputs, numHiddenLayers, quantityInHidden) {
        this.numInputs = numInputs;
        this.quantityInHidden = quantityInHidden;
        this.numOutputs = numOutputs;
        this.numHiddenLayers = numHiddenLayers;
        this.activationResponse = 1.0;
        this.bias = -1.0; // ზღურბლი
        this.neuronLayers = [];
        this.createNetwork();
    }
		
    createNetwork()	{
		// ვქმნით ნეორონების ფენას
		if (this.numHiddenLayers > 0) {
			// ვქმნით დამალულ ფენას (hidden layer)
			let firstHiddenLayer = new NeuronPena(this.quantityInHidden, this.numInputs);
			this.neuronLayers.push(firstHiddenLayer);
	    
		    for (let i = 0; i < this.numHiddenLayers - 1; ++i) {
		    	let newHiddenLayer = new NeuronPena(this.quantityInHidden, this.quantityInHidden);
				this.neuronLayers.push(newHiddenLayer);
		    }
	
		    // ვქმნით გამოსავალ ფენას (output)
		    let outputLayer = new NeuronPena(this.numOutputs, this.quantityInHidden);
			this.neuronLayers.push(outputLayer);
		}
		else {
			let outputLayer = new NeuronPena(this.numOutputs, this.numInputs);
			this.neuronLayers.push(outputLayer);
		}
	}
	
	update(inputs){	
		let myWeight = 0;
		let outputs = [];
		
		// თუ მიღებული რაოდენობა არასწორია
		if (inputs.length != this.numInputs) {
			return outputs;
		}
		
		let inputLayer = true;
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {
			let neuronLayer = this.neuronLayers[i];
			
			if (!inputLayer) {
				inputs = [];
				inputs = inputs.concat(outputs);
			}
			else {
				inputLayer = false;
			}
			
			outputs = [];
			myWeight = 0;
			
			// სიგმოიდურ ფუნქციას ვიყენებთ
			for (let j = 0; j < NeuronPena.neurons.length; ++j) {

				let totalInput = 0;
				let neuron = NeuronPena.neurons[j];
				
				for (let k=0; k < neuron.numInputs - 1; ++k) {
					// თითოეულ წონას ვამრავლებთ input-ზე
					totalInput += neuron.weights[k] * inputs[myWeight];		
					myWeight++;
				}
				
				// ვუმატებთ ზღურბლს
				totalInput += neuron.weights[neuron.weights.length-1] * this.bias;
				outputs.push(this.sigmoid(totalInput, this.activationResponse));
				myWeight = 0;
			}
		}
		return outputs;
	}

	sigmoid(totalInput, activationResponse) { // აქტივაციის სიგმოიდური ფუნქცია
		return ( 1 / ( 1 + Math.exp(-totalInput / activationResponse)));
	}
	
	getWeights() { // აბრუნებს წონებ ს
		let weights = [];
		
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {

			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				for (let k = 0; k <this.neuronLayers[i].neurons[j].numInputs; ++k) {
					weights.push(this.neuronLayers[i].neurons[j].weights[k]);
				}
			}
		}
		return weights;
	}
	
	setWeights(weights) { // "აწესებს" (set) წონებს

		let myWeight = 0;
		
		for (let i = 0; i < this.numHiddenLayers + 1; ++i) {
			for (let j = 0; j < this.neuronLayers[i].neurons.length; ++j) {
				for (let k = 0; k < this.neuronLayers[i].neurons[j].numInputs; ++k) {
					this.neuronLayers[i].neurons[j].weights[k] = weights[myWeight++];
				}
			}
		}
	}
}