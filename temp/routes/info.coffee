
#GET: loads the app when logged in
exports.contact = (req, res) ->

	res.render 'static/contact', { title: 'Sportster - Contact Us'}

#GET: loads the app when logged in
exports.about = (req, res) ->

	res.render 'static/about', { title: 'Sportster - About Us'}

#GET: loads the app when logged in
exports.pricing = (req, res) ->

	res.render 'static/pricing', { title: 'Sportster - Pricing'}
