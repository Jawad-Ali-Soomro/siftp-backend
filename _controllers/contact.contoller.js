const { Contact } = require("../_models")

const createContact = async (req,res) => {
    const createdForm = await Contact.create(req.body)
    return res.json({
        msg: "Created",
        createdForm
    })
}

module.exports = createContact