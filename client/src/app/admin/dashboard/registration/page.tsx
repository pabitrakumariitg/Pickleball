'use client';

import { useState, useEffect } from 'react';
import { Search, Calendar, CreditCard, CheckCircle, XCircle, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/config';
import { toast } from 'sonner';

// Remove Membership and User interfaces
// Add Registration interface matching backend
interface Registration {
    _id: string;
    teamName: string;
    player1: {
        fullName: string;
        phoneNumber: string;
        email: string;
        age?: number;
        duprNo: string;
    };
    player2: {
        fullName: string;
        phoneNumber: string;
        email: string;
        age?: number;
        duprNo: string;
    };
    category: string;
    paymentScreenshot: string;
    paymentStatus: 'pending' | 'verified' | 'rejected';
    createdAt: string;
    updatedAt: string;
}

export default function RegistrationsPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/admin/login');
            return;
        }
    }, [router]);

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            if (!token) {
                router.replace('/admin/login');
                return;
            }
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };
            const response = await fetch(getApiUrl('api/v1/registrations'), { headers });
            if (!response.ok) {
                if (response.status === 403) {
                    router.replace('/admin/login');
                    return;
                }
                throw new Error('Failed to fetch registrations');
            }
            const data = await response.json();
            if (data.status === 'success') {
                setRegistrations(data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError('Failed to load registrations. Please try again.');
            toast.error('Failed to load registrations');
        } finally {
            setIsLoading(false);
        }
    };

    const filteredRegistrations = registrations.filter(reg =>
        reg.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player1.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player2.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player1.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player2.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player1.duprNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.player2.duprNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reg.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getPaymentStatusColor = (status: string) => {
        switch (status) {
            case 'verified':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-foreground">Registration Management</h1>
            </div>
            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                    type="text"
                    placeholder="Search registrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                </div>
            )}
            {/* Registrations Table */}
            <div className="bg-card rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Team Name</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Player 1</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Player 2</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment Screenshot</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment Status</th>
                                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Registered At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRegistrations.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                                        {searchQuery ? 'No registrations found matching your search' : 'No registrations found'}
                                    </td>
                                </tr>
                            ) : (
                                filteredRegistrations.map((reg) => (
                                    <tr key={reg._id} className="border-b border-border last:border-0">
                                        <td className="py-3 px-4 text-sm font-medium text-foreground">{reg.teamName}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <div className="font-medium text-foreground">{reg.player1.fullName}</div>
                                            <div className="text-muted-foreground text-xs">{reg.player1.email}</div>
                                            <div className="text-muted-foreground text-xs">{reg.player1.phoneNumber}</div>
                                            <div className="text-muted-foreground text-xs">DUPR No: {reg.player1.duprNo}</div>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <div className="font-medium text-foreground">{reg.player2.fullName}</div>
                                            <div className="text-muted-foreground text-xs">{reg.player2.email}</div>
                                            <div className="text-muted-foreground text-xs">{reg.player2.phoneNumber}</div>
                                            <div className="text-muted-foreground text-xs">DUPR No: {reg.player2.duprNo}</div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-foreground">{reg.category}</td>
                                        <td className="py-3 px-4 text-sm">
                                            <a href={reg.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="text-primary underline">View</a>
                                        </td>
                                        <td className="py-3 px-4 text-sm">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(reg.paymentStatus)}`}>
                                                {reg.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-foreground">{new Date(reg.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
} 