var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    id:{
      type:Number,
        min:0
    },

    name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,

    sellerName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
});

mongoose.model('Product', productSchema);
