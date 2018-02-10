'use strict';

var valores = {
  credit: 0,
  debt: 0,
};

module.exports = function(Billingcycle) {
  Billingcycle.summary = function(cb) {
    Billingcycle.find({}, function(err, instance) {
      var credits = 0;
      var debts = 0;

      instance.map(function(params) {
        params._credits.map(function(paramsCredits) {
          credits = credits + paramsCredits.value;
        });
        valores.credit = credits;

        params._debts.map(function(paramsDebts) {
          debts = debts + paramsDebts.value;
        });
        valores.debt = debts;
      });

      cb(null, valores);
    });
  };

  Billingcycle.remoteMethod('summary', {
    http: {path: '/summary', verb: 'get'},
    returns: {arg: 'summary', type: 'json'},
  });

  Billingcycle.validatesPresenceOf('name',
        {message: 'Campo Obrigatório'}
    );
};
