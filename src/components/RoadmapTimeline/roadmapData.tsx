import { Rocket, Code, Shield, Coins, Users, Gift, Gavel, Star, Database, Server, Zap, CheckCircle, Cpu, Cloud, Network, Lock } from 'lucide-react';
import { RoadmapItem } from './types';

export const roadmapData: RoadmapItem[] = [
  // Completed items from original file
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
  // In progress and upcoming items
  {
    title: 'Node Sale',
    description: 'Initial node operator selection process begins with the sale of validator nodes to qualified participants who will secure the network.',
    icon: <Users className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 2,
      month: 'April'
    }
  },
  {
    title: 'Security Audit',
    description: 'Comprehensive third-party security audit of all smart contracts and protocol mechanisms to ensure maximum safety and reliability.',
    icon: <Shield className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 1,
      month: 'March'
    }
  },
  {
    title: 'dApps on Testnet',
    description: 'Deployment of initial dApps on Testnet, including SDK release, Decentralized Identity (CE), Application Catalog, and DevHub (CE).',
    icon: <Code className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 2,
      month: 'April'
    }
  },
  {
    title: 'Enterprise Solutions Core Launch',
    description: 'Launch of foundational Enterprise components including Decentralized ID, QIES, Quantum File System, Operating System, and Quantum Private Network.',
    icon: <Lock className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 2,
      month: 'June'
    }
  },
  {
    title: 'MVP Release',
    description: 'Completion of MVP demonstrating end-to-end transaction using dually decentralized micro-node architecture within the Autheo Hub ecosystem.',
    icon: <CheckCircle className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 2,
      month: 'June'
    }
  },
  {
    title: 'Beta Launch',
    description: 'Release of Beta version with expanded dApps testing, refinement of Layer 1, DeFi functionalities, and initial DePIN components.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 3,
      month: 'July'
    }
  },
  {
    title: 'Enterprise WiFi Launch',
    description: 'Rollout of Enterprise WiFi solution at consumer scale with target revenue of ~$140M for Q3-Q4.',
    icon: <Network className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2025,
      quarter: 3,
      month: 'July'
    }
  },
  {
    title: 'Mainnet Launch',
    description: 'Official launch of the Autheo Mainnet with full functionality, marking the beginning of real-world operations and value transfer.',
    icon: <Rocket className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2026,
      quarter: 2,
      month: 'May'
    }
  },
  {
    title: 'Decentralized Storage Launch',
    description: 'Mainnet deployment and wider availability of Decentralized Storage solution.',
    icon: <Database className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2026,
      quarter: 2,
      month: 'June'
    }
  },
  {
    title: 'Advanced Node Platform',
    description: 'Continued development and scaling of the Node Platform with enhanced capabilities.',
    icon: <Server className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2026,
      quarter: 3,
      month: 'August'
    }
  },
  {
    title: 'SDK v3.0 Release',
    description: 'Major SDK update adding Web4 Hub API and full AI integration support.',
    icon: <Code className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2026,
      quarter: 2,
      month: 'May'
    }
  },
  {
    title: 'Validators and IPFS Nodes',
    description: 'Full deployment and operationalization of Validators and IPFS Nodes.',
    icon: <Cloud className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2026,
      quarter: 4,
      month: 'November'
    }
  },
  {
    title: '1-click Deployment',
    description: 'Implementation of simplified node deployment tools for easier onboarding and network growth.',
    icon: <Zap className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2027,
      quarter: 1,
      month: 'February'
    }
  },
  {
    title: 'Full Autheo Hub Launch',
    description: 'Release of the complete Autheo Hub AR/VR marketplace with voice, zones, and social features.',
    icon: <Star className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2027,
      quarter: 3,
      month: 'August'
    }
  },
  {
    title: 'DePIN Full Deployment',
    description: 'Achieving full production scale for the DePIN infrastructure (1000 PMN/VMN) with mature subnets and target performance metrics.',
    icon: <Cpu className="w-6 h-6" />,
    status: 'not-started',
    date: {
      year: 2027,
      quarter: 4,
      month: 'October'
    }
  }
];