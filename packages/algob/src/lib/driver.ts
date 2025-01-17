// This module provides algorand SDK driver

import algosdk from "algosdk";

import { ALGOB_CHAIN_NAME } from "../internal/constants";
import { HttpNetworkConfig, KmdCfg, Network } from "../types";

// @note: probably in the future we will remove this function and provide our own wrapper
export function createClient (n: Network): algosdk.Algodv2 {
  if (n.name !== ALGOB_CHAIN_NAME) {
    const cfg = n.config as HttpNetworkConfig;
    const algodv2 = new algosdk.Algodv2(cfg.token, cfg.host, cfg.port);
    algodv2.setIntEncoding('mixed'); // to support values > Number.MAX_SAFE_INTEGER
    return algodv2;
  }
  throw Error("Initializing SDK driver for AlgobChain is not supported yet");
}

export function createKmdClient (kmdCfg: KmdCfg): algosdk.Kmd {
  return new algosdk.Kmd(kmdCfg.token, kmdCfg.host, kmdCfg.port);
}
