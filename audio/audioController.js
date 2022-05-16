class Blip {
	constructor(source) {
		this.channels = []
		this.max = 5
		this.index = 0
		for(let i = 0; i < this.max; i++) {
			this.channels.push(new Audio(source))
			this.channels[i].volume = 0.4
		}
	}
	play() {
		this.channels[this.index].play()
		if(++this.index == this.max) this.index = 0
	}
}

class AudioController {
	blips = {
		blip: new Blip("./audio/blips/sfx-blipold.wav")
	}

	rogerBlips = {
		a: new Blip("./audio/blips/roger/a.ogg"),
		b: new Blip("./audio/blips/roger/b.ogg"),
		c: new Blip("./audio/blips/roger/c.ogg"),
		d: new Blip("./audio/blips/roger/d.ogg"),
		e: new Blip("./audio/blips/roger/e.ogg"),
		f: new Blip("./audio/blips/roger/f.ogg"),
		g: new Blip("./audio/blips/roger/g.ogg"),
		h: new Blip("./audio/blips/roger/h.ogg"),
		i: new Blip("./audio/blips/roger/i.ogg"),
		j: new Blip("./audio/blips/roger/j.ogg"),
		k: new Blip("./audio/blips/roger/k.ogg"),
		l: new Blip("./audio/blips/roger/l.ogg"),
		m: new Blip("./audio/blips/roger/m.ogg"),
		n: new Blip("./audio/blips/roger/n.ogg"),
		o: new Blip("./audio/blips/roger/o.ogg"),
		p: new Blip("./audio/blips/roger/p.ogg"),
		q: new Blip("./audio/blips/roger/q.ogg"),
		r: new Blip("./audio/blips/roger/r.ogg"),
		s: new Blip("./audio/blips/roger/s.ogg"),
		t: new Blip("./audio/blips/roger/t.ogg"),
		u: new Blip("./audio/blips/roger/u.ogg"),
		v: new Blip("./audio/blips/roger/v.ogg"),
		w: new Blip("./audio/blips/roger/w.ogg"),
		x: new Blip("./audio/blips/roger/x.ogg"),
		y: new Blip("./audio/blips/roger/y.ogg"),
		z: new Blip("./audio/blips/roger/z.ogg")
	}
}

export default new AudioController()