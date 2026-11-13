import express from 'express'
import { connectDb } from './db.js'
import { Odam } from './user.js'

connectDb()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Bu bosh sahifa')
})

app.post('/odam', async (req, res) => {
	const yangiOdam = await Odam.create(req.body)
	res.status(201).json({ message: 'Successfully created' })
})

app.get('/odamlar', async (req, res) => {
	let odamlar = await Odam.find()
	res.status(200).json(odamlar)
})

app.get('/odam/:id', async (req, res) => {
	let odam = await Odam.findById(req.params.id)
	if (!odam) {
		res.status(404).json({ message: 'Not found' })
	}
	res.status(200).json(odam)
})

app.patch('/odam/:id', async (req, res) => {
	let odam = await Odam.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	})
	if (!odam) {
		return res.status(404).json({ message: 'Not found' })
	}
	res.status(200).json(odam)
})

app.delete('/odam/:id', async (req, res) => {
	let odam = await Odam.findByIdAndDelete(req.params.id)
	if (!odam) {
		res.status(404).json({ message: 'Not found' })
	}
	res.status(200).json({ message: 'Deleted' })
})

app.listen(4000, console.log('Server running http://localhost:4000'))
