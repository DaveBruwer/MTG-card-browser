Vue.createApp({
	data() {
		return {
			header1: "Magic the Gathering Card Browser",
			cardNumber: 249713,
			displayCardDetails: true,
			apiURL: "https://api.magicthegathering.io/v1/cards/",
			testCardNo: 2,
			cardName: "",
			cardImageURL: "cardback.jpg",
			cardText: "",
			cardFlavor: "",
			cardType: ""
		}
	},
	methods: {
		getCard() {
			this.clearCard()
			this.cardName = "Fetching Card Info..."
			this.fetchCard(false)
		},
		findRandomCard() {
			this.clearCard()
			this.getRandomNum()
			this.cardName = "Looking for a random card . . ."
			this.cardType = `Trying card ID: ${this.cardNumber}`
			this.fetchCard(true)
		},
		fetchCard(_continueLooking) {
			fetch(this.apiURL + this.cardNumber)
			.then(resp => {
				if (resp.ok) {
					return resp.json()
				} else {
					if (_continueLooking) {
						console.log('Trying another number!')
						this.getRandomNum()
						this.cardType = `Trying card ID: ${this.cardNumber}`
						this.fetchCard(true)
					} else {
					this.cardName = this.cardNumber + " is not a valid card ID!"
					}
				}
			})
			.then(card => {
				if (card) {
					if (card.card.power && card.card.toughness) {
						this.cardName = `${card.card.name} ${card.card.power} / ${card.card.toughness}`
					} else {
						this.cardName = `${card.card.name}`
					}
					this.cardText = card.card.originalText
					this.cardFlavor = card.card.flavor
					this.cardImageURL = card.card.imageUrl
					this.cardType = card.card.type
				}
			})
			.catch(err => console.log(err))
		},
		getRandomNum() {
			this.cardNumber = Math.floor(Math.random()*1000000)
			console.log('Random number generated: ' + this.cardNumber)
		},
		clearCard() {
			this.cardImageURL = "cardback.jpg"
			this.cardText = ""
			this.cardFlavor = ""
			this.cardType = ""
		}
	},
	beforeMount() {
      console.log("beforeMount")
      this.getCard()
      this.displayCardDetails = true
    }
}).mount('#App');