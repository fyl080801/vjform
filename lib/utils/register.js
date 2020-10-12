import { createRegistry } from '../registry'

// transform
import * as bind from '../internal/transform/bind'
import * as func from '../internal/transform/func'
import * as on from '../internal/transform/on'
import * as update from '../internal/transform/update'
import * as fieldArray from '../internal/transform/array'

// provider
import fieldOptions from '../internal/provider/fieldOptions'
import model from '../internal/provider/model'
import text from '../internal/provider/text'
import condition from '../internal/provider/condition'
import events from '../internal/provider/events'

// datasource
import requestSource from '../internal/datasource/request'
import objectSource from '../internal/datasource/object'

// functional
import addition from '../internal/functional/addition'
import division from '../internal/functional/division'
import multiply from '../internal/functional/multiply'
import subtraction from '../internal/functional/subtraction'
import equal from '../internal/functional/equal'
import filter from '../internal/functional/filter'
import find from '../internal/functional/find'
import get from '../internal/functional/get'
import iffunc from '../internal/functional/if'
import includes from '../internal/functional/includes'
import map from '../internal/functional/map'
import reduce from '../internal/functional/reduce'
import textfunc from '../internal/functional/text'

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
    provider(model)
    provider(text)
    provider(condition)
    provider(events)

    //
    datasource('request', requestSource)
    datasource('object', objectSource)

    // functional
    functional('addition'.toUpperCase(), addition)
    functional('division'.toUpperCase(), division)
    functional('multiply'.toUpperCase(), multiply)
    functional('subtraction'.toUpperCase(), subtraction)
    functional('equal'.toUpperCase(), equal)
    functional('filter'.toUpperCase(), filter)
    functional('find'.toUpperCase(), find)
    functional('get'.toUpperCase(), get)
    functional('if'.toUpperCase(), iffunc)
    functional('includes'.toUpperCase(), includes)
    functional('map'.toUpperCase(), map)
    functional('reduce'.toUpperCase(), reduce)
    functional('text'.toUpperCase(), textfunc)
  })

  return instance
}

export default createInternalRegistry()
