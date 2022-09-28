const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon")

const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxLength: 100},
    family_name: {type: String, required: true, maxLength: 100}, 
    date_of_birth: {type: Date}, 
    date_of_death: {type: Date},
})

// Virtual for author's full name
AuthorSchema.virtual("name").get( function() {
    let fullname = ""
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`
    }
    if (!this.first_name || !this.family_name){
        fullname = ""
    }
    return fullname
})


// Virtual for author's URL 
AuthorSchema.virtual("url").get(function() {
    return `/catalog/author/${this.id}`
})

AuthorSchema.virtual("lifespan").get(function(){
    if (this.date_of_death !== undefined && this.date_of_birth !== undefined){
        return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}`;
    } else if (this.date_of_birth !== undefined && this.date_of_death === undefined) {
        return `${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)} - Still Kickin'!`;
    }else if (this.date_of_birth === undefined && this.date_of_death === undefined) {
        return 'Birth Info Unavailable  :( '
        
    }
    
})


module.exports = mongoose.model("Author", AuthorSchema)
