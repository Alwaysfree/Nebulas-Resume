"use strict";

var Item = function(text) {
  if (text) {
    var obj = JSON.parse(text);
    this.key = obj.key;
    this.value = obj.value;
    this.author = obj.author;
  } else {
    this.key = "";
    this.value = "";
    this.author = "";
  }
};

Item.prototype = {
  toString: function () {
    return JSON.stringify(this);
  }
};

var ResumeContract = function () {
  LocalContractStorage.defineMapProperty(this, "repo", {
    parse: function (text) {
      return new Item(text);
    },
    stringify: function (o) {
      return o.toString();
    }
  });
};

ResumeContract.prototype = {
  init: function () {
    // todo
  },

  save: function (key,username,value) {
    key = key.trim();
    value = value.trim();
    username = username.trim();
    if (key === "" || value === "" ||username === ""){
        throw new Error("empty key /username/ value");
    }
    if (key.length > 64){
        throw new Error("key / value exceed limit length")
    }

    var from = Blockchain.transaction.from;
    var item = this.repo.get(key);
    if (item){
        throw new Error("value has been occupied");
    }

    item = new Item();
    item.key = key;
    item.value = value;
    item.author = username + from;
    this.repo.put(key, item);
  },

  get: function (key) {
    key = key.trim();
    if ( key === "" ) {
      throw new Error("empty key")
    }
    return this.repo.get(key);
  }
};
module.exports = ResumeContract;
n1fyffSvnHdBen7JNGxk9dpUAbJJaQReNFQ
03f0008d724dcc2970500f1759b5a60d069c46396b9543ad7551a85d64f5bdd7
   