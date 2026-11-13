import mongoose from 'mongoose'
import argon2 from 'argon2'

const OdamSchema = new mongoose.Schema({
	login: { type: String, required: true, unique: true, trim: true },
	parol: { type: String, required: true, unique: true, minlength: 3 },
	ism: { type: String, required: true },
	role: { type: String, required: true },
	yoshi: { type: Number, required: true },
	izoh: { type: String, required: false },
})

OdamSchema.pre('save', async function () {
	if (this.isModified('parol')) {
		this.parol = await argon2.hash(this.parol)
	}
})

OdamSchema.pre('findOneAndUpdate', async function () {
	const update = this.getUpdate()
	if (update && update.parol()) {
		update.parol = await argon2.hash(update.parol)
	}
})

export const Odam = mongoose.model('Odam', OdamSchema)
