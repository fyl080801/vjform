import { createRegistry } from '../registry'

// transform
import * as bind from '../internal/transform/bind'
import * as func from '../internal/transform/func'
import * as on from '../internal/transform/on'
import * as update from '../internal/transform/update'
import * as fieldArray from '../internal/transform/array'

// provider
import fieldOptions from '../internal/provider/fieldOptions'
import text from '../internal/provider/text'
import condition from '../internal/provider/condition'
import events from '../internal/provider/events'

// datasource
import requestSource from '../internal/datasource/request'
import objectSource from '../internal/datasource/object'

// functional
import { addition } from '../internal/functional/addition'
import { division } from '../internal/functional/division'
import { multiply } from '../internal/functional/multiply'
import { subtraction } from '../internal/functional/subtraction'

const createInternalRegistry = () => {
  const instance = createRegistry()

  instance.use(feature => {
    const { transform, datasource, provider, functional } = feature

    //
    transform(bind.getter, bind.deal)
    transform(func.getter, func.deal)
    transform(on.getter, on.deal)
    transform(update.getter, update.deal)
    transform(fieldArray.getter, fieldArray.deal)

    // provider
    provider(fieldOptions).withIndex(-1024)
    provider(text)
    provider(condition)
    provider(events)

    //
    datasource('request', requestSource)
    datasource('object', objectSource)

    // functional
    functional('addition'.toUpperCase(), addition)
    // .withDescription('数字相加')
    // .withGroup('计算')
    functional('division'.toUpperCase(), division)
    // .withDescription('数字相除')
    // .withGroup('计算')
    functional('multiply'.toUpperCase(), multiply)
    // .withDescription('数字相乘')
    // .withGroup('计算')
    functional('subtraction'.toUpperCase(), subtraction)
    // .withDescription('数字相减')
    // .withGroup('计算')
  })

  return instance
}

export default createInternalRegistry()
