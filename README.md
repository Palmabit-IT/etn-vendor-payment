# etn-vendor-payment

<etn-vendor-payment> is a web component for generating Electroneum payment string and display it as QR code for the customer to scan using the Electroneum app on their mobile device.

Features:

* Dependency-free
* HTML Custom element with shadow DOM

## Installation

```
npm install @palmabit/etn-vendor-payment
```

## Usage

import the module

```
<script type="module">
import './node_modules/etn-vendor-payment/index.js';
</script>
```

Put the <etn-vendor-payment></etn-vendor-payment> component in your markup wherever you want it to appear.

Example:

```
<etn-vendor-payment outledId="5ba657721ca5b" paymentId="7ce25b4dc0" amount="100"></etn-vendor-payment>
```

The payment string is made up of the following parameters:

```
{outletId}/{paymentIdd}/{amount}
```

For more info see the ETN instant payment API docs: [etn api guide](https://community.electroneum.com/t/using-the-etn-instant-payment-api/121)


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Credits

* [Palmabit](https://www.palmabit.com) - Sponsor

## License

MIT. See [LICENSE](./LICENSE)
