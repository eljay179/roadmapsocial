import { Rocket, Code, Shield, Coins, Users, Gift, Gavel, Star } from 'lucide-react';
import { RoadmapItem } from './types';

export const roadmapData: RoadmapItem[] = [
  {
    title: 'Devnet Launch',
    description: 'Launch of the development network environment for early testing and protocol refinement with core functionality and initial smart contract deployment.',
    icon: <Code className="w-6 h-6" />,
    status: 'completed',
    date: {
      year: 2024,
      quarter: 4,
      month: 'November'
    }
  },
  {
    title: 'Testnet Launch',
    description: 'Release of public testnet allowing developers to build and test applications in a controlled environment before mainnet deployment.',
    icon: <Rocket className="w-6 h-6" />,
    status: 'completed',
    date: {
      year: 2024,
      quarter: 4,
      month: 'December'
    }
  },
  {
    title: 'Incentivized Testnet',
    description: 'Launch of incentivized testing phase where participants can earn rewards for discovering bugs and contributing to network stability.',
    icon: <Coins className="w-6 h-6" />,
    status: 'in-progress',
    date: {
      year: 2024,
      quarter: 4,
      month: 'December'
    }
  },
  {
    title: 'Node Sale',
    description: 'Initial node operator selection process begins with the sale of validator nodes to qualified participants who will secure the network.',
    icon: <Users className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2024,
      quarter: 4,
      month: 'December'
    }
  },
  {
    title: 'Security Audit',
    description: 'Comprehensive third-party security audit of all smart contracts and protocol mechanisms to ensure maximum safety and reliability.',
    icon: <Shield className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2024,
      quarter: 4,
      month: 'December'
    }
  },
  {
    title: 'Airdrop Campaign',
    description: 'Strategic token distribution to early supporters and community members who participated in network development and testing phases.',
    icon: <Gift className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2024,
      quarter: 4,
      month: 'December'
    }
  },
  {
    title: 'Public Token Sale',
    description: 'Opening of public token sale round with fair distribution mechanisms and participation guidelines for the broader community.',
    icon: <Gavel className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 1,
      month: 'January'
    }
  },
  {
    title: 'Mainnet Launch',
    description: 'Official launch of the production network with full functionality, marking the beginning of real-world operations and value transfer.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 1,
      month: 'January'
    }
  },
  {
    title: 'Exchange Listings',
    description: 'Strategic partnerships with major cryptocurrency exchanges to provide liquidity and trading options for token holders.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 1,
      month: 'February'
    }
  },
  {
    title: 'Commercial Launch of Social Platform',
    description: 'Release of the integrated social platform featuring decentralized identity, content sharing, and community engagement tools.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 1,
      month: 'February'
    }
  }
];