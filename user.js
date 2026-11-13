import mongoose from 'mongoose'
const OdamSchema = new mongoose.Schema({

	ism: { type: String, required: true },
	role: { type: String, required: true },
	yoshi: { type: Number, required: true },
	izoh: { type: String, required: false },
})


export const Odam = mongoose.model('Odam', OdamSchema)
