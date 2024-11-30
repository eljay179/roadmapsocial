import { Rocket, Code, Shield, Coins, Users, Gift, Gavel, Star } from 'lucide-react';

export const roadmapData = [
  {
    title: 'Devnet Launch',
    date: 'Q4 2024 - November',
    description: 'Launch of the development network environment for early testing and protocol refinement with core functionality and initial smart contract deployment.',
    icon: <Code className="w-6 h-6" />,
    status: 'completed' as const,
  },
  {
    title: 'Testnet Launch',
    date: 'Q4 2024 - December',
    description: 'Release of public testnet allowing developers to build and test applications in a controlled environment before mainnet deployment.',
    icon: <Rocket className="w-6 h-6" />,
    status: 'in-progress' as const,
  },
  {
    title: 'Incentivized Testnet',
    date: 'Q4 2024 - December',
    description: 'Launch of incentivized testing phase where participants can earn rewards for discovering bugs and contributing to network stability.',
    icon: <Coins className="w-6 h-6" />,
    status: 'not-started' as const,
  },
  {
    title: 'Node Sale',
    date: 'Q4 2024 - December',
    description: 'Initial node operator selection process begins with the sale of validator nodes to qualified participants who will secure the network.',
    icon: <Users className="w-6 h-6" />,
    status: 'not-started' as const,
  },
  {
    title: 'Security Audit',
    date: 'Q4 2024 - December',
    description: 'Comprehensive third-party security audit of all smart contracts and protocol mechanisms to ensure maximum safety and reliability.',
    icon: <Shield className="w-6 h-6" />,
    status: 'not-started' as const,
  },
  {
    title: 'Airdrop',
    date: 'Q1 2025 - January',
    description: 'Strategic token distribution to early supporters and community members who participated in network development and testing phases.',
    icon: <Gift className="w-6 h-6" />,
    status: 'not-started' as const,
  },
  {
    title: 'Autheo DAO Launch',
    date: 'Q1 2025 - January',
    description: 'Deployment of the decentralized autonomous organization enabling community governance and collective decision-making for the protocol.',
    icon: <Gavel className="w-6 h-6" />,
    status: 'not-started' as const,
  },
  {
    title: 'Mainnet Launch',
    date: 'Q1 2025 - January',
    description: 'Official launch of the production network with full functionality, marking the beginning of real-world operations and value transfer.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started' as const,
  },
];