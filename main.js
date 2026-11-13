import express from 'express'
import { connectDb } from './db.js'
import { Odam } from './user.js'

import { errorCatch } from './error.js'

connectDb()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
	res.send('Bu bosh sahifa')
})

app.post('/odam', async (req, res) => {
	try {
		const isLogin = Odam.find(req.body.login == Odam.login)
		if (isLogin) {
			return res.status(400).json({
				message: ` Login:'${req.body.login}' - Bu Login allaqachon band qilngan `,
			})
		}
		const yangiOdam = await Odam.create(req.body)

		res
			.status(201)
			.json({ message: 'Successfully created', data: { yangiOdam } })
	} catch (error) {
		errorCatch()
	}
})

app.get('/odamlar', async (req, res) => {
	try {
		let odamlar = await Odam.find()
		return res.status(200).json(odamlar)
	} catch (error) {
		errorCatch()
	}
})

app.get('/odam/:id', async (req, res) => {
	try {
		let odam = await Odam.findById(req.params.id)
		if (!odam) {
			res.status(404).json({ message: 'Not found' })
		}
		res.status(200).json(odam)
	} catch (error) {
		errorCatch()
	}
})

app.patch('/odam/:id', async (req, res) => {
	try {
		let odam = await Odam.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})
		if (!odam) {
			return res.status(404).json({ message: 'Not found' })
		}
		res.status(200).json(odam)
	} catch (error) {
		errorCatch()
	}
})

app.delete('/odam/:id', async (req, res) => {
	try {
		let odam = await Odam.findByIdAndDelete(req.params.id)
		if (!odam) {
			return res.status(404).json({ message: 'Not found' })
		}
		res.status(200).json({ message: 'Deleted' })
	} catch (error) {
		errorCatch()
	}
})



app.get('/odamLogin/:login', async (req, res) => {
	try {
		const odam = await Odam.fidOne({ login: req.params.login })
		if (!odam) {
			return res.status(404).json({ message: 'NOt found user' })
		}
		res.status(200).json({ data: { odam } })
	} catch (error) {
		res.status(500).json({ return: 'Server xatosi kalla qoyding!!!' })
	}
})





app.listen(4000, console.log('Server running http://localhost:4000'))
