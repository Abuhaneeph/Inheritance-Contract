import abi from './Inheritance.json'

export const ABI =abi.abi;
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const contractAddress="0xaE8021DD997cc7b572fbE32D2464C27E997ea690";