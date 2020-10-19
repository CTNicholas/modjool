# Manually installing
## modjool.js
Modjool. Includes the Basic & Advanced APIs. For use in for script imports:
```
<script src="modjool.js"></script>
``` 

## modjool-lite.js
Modjool Lite. Only includes the Basic API. For use in for script imports:
```
<script src="modjool-lite.js"></script>
``` 

## modjool.umd.js
Includes Modjool & Modjool Lite. For use in Rollup, Webpack etc:
```
import { modjool, modjoolLite } from './modjool.umd.js'
```
```
const { modjool, modjoolLite } = require('./modjool.umd.js')
```
