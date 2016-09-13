import { run } from './helper'
import { loadAbiByName, getContract } from '../../../utils/web3'

export default function (params) {
  return loadAbiByName('Core')
    .then((abi) => {
      const core = getContract(abi, params[0]);
      return run('Lesson_7', [core.getModule('Market'), core.getModule('Market regulator')])
    })
}
