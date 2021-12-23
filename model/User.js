const {Schema,model} = require('mongoose');
const {dateShamsi} =require('../hooks/JDF');
const cartSchema = new Schema({
 product:{
  required:true,
  type:String,
 },
 numbers:{
  required:true,
  type:Number
 }
});
const paymentSchema = new Schema({
 howmuch:{
  type:Number,
  default:0
 },
 date:{
  type:String,
  default:dateShamsi()
 },
})
const userSchema = new Schema({
 username:{
  type:String,
  maxlength:50,
  unique:true
 },
 cart:{
  type:[cartSchema],
  default:[]
 },
 payment:[paymentSchema],
  three:{
  numberof:{
   type:Number,
   default:0
  },
 date:{
  type:String,
  default:dateShamsi()
 },
  fee:{
   type:Number,
   default:0
  },
  pay:{
   type:Number
  }
 },
 four:{
  numberof:{
   type:Number,
   default:0
  },
  fee:{
   type:Number,
   default:0
  },

 date:{
  type:String,
  default:dateShamsi()
 },
  pay:{
   type:Number
  }
 },
 five:{
  numberof:{
   type:Number,
   default:0
  },
  fee:{
   type:Number,
   default:0
  },
 date:{
  type:String,
  default:dateShamsi()
 },
  pay:{
   type:Number
  }
 },
 six:{
  numberof:{
   type:Number,
   default:0
  },
  fee:{
   type:Number,
   default:0
  },
 date:{
  type:String,
  default:dateShamsi()
 },
  pay:{
   type:Number
  }
 },
 seven:{
  numberof:{
   type:Number,
   default:0
  },
  fee:{
   type:Number,
   default:0
  },
 date:{
  type:String,
  default:dateShamsi()
 },

  pay:{
   type:Number
  }
 },
 date:{
  type:String,
  default:dateShamsi()
 },
 total:{
  type:Number
 }
});
userSchema.pre('save',async function(next){
this.three.pay = this.three.fee * this.three.numberof;
this.four.pay = this.four.fee * this.four.numberof;
this.five.pay = this.five.fee * this.five.numberof;
this.six.pay = this.six.fee * this.six.numberof;
this.seven.pay = this.seven.fee * this.seven.numberof;
this.total =this.three.pay + this.four.pay + this.five.pay + this.six.pay + this.seven.pay;
 next();
})
const User =model('user',userSchema);
module.exports = User;