import abi from './Inheritance.json'

export const ABI =abi.abi;
export const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const contractAddress="0x78C3e983594360eb66f60eAc5dE47152D783EB63";