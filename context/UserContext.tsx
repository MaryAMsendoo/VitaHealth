'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
    id: string
    name: string
    email: string
    role: 'patient' | 'doctor'
    createdAt: string
    avatar?: string
    phone?: string
    dateOfBirth?: string
    specialization?: string
    licenseNumber?: string
}

export interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
    register: (userData: Omit<User, 'id' | 'createdAt'> & { password: string }) => Promise<{ success: boolean; error?: string }>
    logout: () => void
    isLoading: boolean
    testAccounts: { email: string; password: string; role: 'patient' | 'doctor' }[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Pre-defined test accounts for development
    const testAccounts = [
        { email: 'mary@vitahealth.com', password: 'password123', role: 'patient' as const },
        { email: 'raphel@vitahealth.com', password: 'password123', role: 'doctor' as const },
        { email: 'rejoice@test.com', password: 'test123', role: 'patient' as const },
        { email: 'dr.smith@test.com', password: 'test123', role: 'doctor' as const }
    ]

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('vitahealth_user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
        setIsLoading(false)
    }, [])

    // Initialize with test accounts if no users exist
    useEffect(() => {
        const existingUsers = localStorage.getItem('vitahealth_users')
        if (!existingUsers) {
            const initialUsers = testAccounts.map((account, index) => ({
                id: `test-${index + 1}`,
                name: account.role === 'doctor' ? `Dr. ${account.email.split('@')[0]}` : account.email.split('@')[0],
                email: account.email,
                password: account.password,
                role: account.role,
                createdAt: new Date().toISOString()
            }))
            localStorage.setItem('vitahealth_users', JSON.stringify(initialUsers))
        }
    }, [])

    const getUsers = (): (User & { password: string })[] => {
        return JSON.parse(localStorage.getItem('vitahealth_users') || '[]')
    }

    const saveUsers = (users: (User & { password: string })[]) => {
        localStorage.setItem('vitahealth_users', JSON.stringify(users))
    }

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        try {
            setIsLoading(true)

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            const users = getUsers()
            const foundUser = users.find(u => u.email === email && u.password === password)

            if (!foundUser) {
                return { success: false, error: 'Invalid email or password' }
            }

            const { password: _, ...userWithoutPassword } = foundUser
            setUser(userWithoutPassword)
            localStorage.setItem('vitahealth_user', JSON.stringify(userWithoutPassword))

            return { success: true }
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userData: Omit<User, 'id' | 'createdAt'> & { password: string }): Promise<{ success: boolean; error?: string }> => {
        try {
            setIsLoading(true)

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            const users = getUsers()

            // Check if user already exists
            if (users.find(u => u.email === userData.email)) {
                return { success: false, error: 'User with this email already exists' }
            }

            // Create new user
            const newUser: User & { password: string } = {
                ...userData,
                id: Date.now().toString(),
                createdAt: new Date().toISOString()
            }

            users.push(newUser)
            saveUsers(users)

            const { password: _, ...userWithoutPassword } = newUser
            setUser(userWithoutPassword)
            localStorage.setItem('vitahealth_user', JSON.stringify(userWithoutPassword))

            return { success: true }
        } catch (error) {
            return { success: false, error: 'Registration failed. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('vitahealth_user')
    }

    const value = {
        user,
        login,
        register,
        logout,
        isLoading,
        testAccounts
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}