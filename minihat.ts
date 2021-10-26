import * as ethers from 'ethers'
import { BigNumber } from 'ethers'
import { BigDecimal } from 'bigdecimal'

export const chai = require('chai');
chai.use(require('chai-as-promised'))
export const want = chai.expect

export function N (n: number): BigNumber {
  return ethers.BigNumber.from(n)
}

export const BANKYEAR = ((365 * 24) + 6) * 3600
export const WAD = N(10).pow(N(18))
export const RAY = N(10).pow(N(27))
export const RAD = N(10).pow(N(45))
export const U256_MAX = N(2).pow(N(256)).sub(N(1))

export function wad (n: number): BigNumber {
  const bd = new BigDecimal(n)
  const WAD_ = new BigDecimal(WAD.toString())
  const scaled = bd.multiply(WAD_)
  const rounded = scaled.toBigInteger()
  return BigNumber.from(rounded.toString())
}

export function ray (n: number): BigNumber {
  const bd = new BigDecimal(n)
  const RAY_ = new BigDecimal(RAY.toString())
  const scaled = bd.multiply(RAY_)
  const rounded = scaled.toBigInteger()
  return BigNumber.from(rounded.toString())
}

export function rad (n: number): BigNumber {
  const bd = new BigDecimal(n)
  const RAD_ = new BigDecimal(RAD.toString())
  const scaled = bd.multiply(RAD_)
  const rounded = scaled.toBigInteger()
  return BigNumber.from(rounded.toString())
}

// Annualized rate, as a ray
export function apy (n: number): BigNumber {
  // apy = spy^YEAR  ==>  spy = root_{BANKYEAR}(apy)
  //                 ==>  spy = apy ^ (1 / YEAR)
  return ray(Math.pow(n, 1 / BANKYEAR))
}

export async function send (...args) {
  const f = args[0]
  const fargs = args.slice(1)
  const tx = await f(...fargs)
  return await tx.wait()
}

export async function fail (...args) {
  const err = args[0]
  const sargs = args.slice(1)
  await want(send(...sargs)).rejectedWith(err)
}

export async function failRevert (...args) {
  const err = args[0]
  const sargs = args.slice(1)
  await want(send(...sargs)).rejectedWith(
    `VM Exception while processing transaction: reverted with custom error '${err}'`
  )
}

export async function wait (hre, t) {
  await hre.network.provider.request({
    method: 'evm_increaseTime',
    params: [t]
  })
}

export async function warp (hre, t) {
  await hre.network.provider.request({
    method: 'evm_setNextBlockTimestamp',
    params: [t]
  })
}

export async function mine (hre, t = undefined) {
  if (t !== undefined) {
    await wait(hre, t)
  }
  await hre.network.provider.request({
    method: 'evm_mine'
  })
}

let _snap

export async function snapshot (hre) {
  _snap = await hre.network.provider.request({
    method: 'evm_snapshot'
  })
}

export async function revert (hre) {
  await hre.network.provider.request({
    method: 'evm_revert',
    params: [_snap]
  })
  await snapshot(hre)
}
