use cardano/transaction.{OutputReference, Transaction}

validator blockpad_escrow {
  spend(
    _datum: Option<Data>,
    _redeemer: Data,
    _input: OutputReference,
    _ctx: Transaction,
  ) {
    True
  }
}
