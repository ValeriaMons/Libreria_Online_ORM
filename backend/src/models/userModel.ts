import User from './Users';
import { UserInput, UserAttributes } from '../interface/user';

export const userModel = {
    async getUserByEmail(email: string): Promise<User | null> {
        return await User.findOne({ where: { email } });
    },

    async getUserById(id: number): Promise<User | null> {
        return await User.findByPk(id);
    },

    async createUser(user: UserInput): Promise<User> {
        return await User.create(user as UserAttributes);
    },

    async updateUser(id: number, userData: Partial<UserAttributes>): Promise<User | null> {
        const [updatedRowsCount, updatedUsers] = await User.update(userData, {
            where: { id: id },
            returning: true,
        });
        return updatedRowsCount > 0 ? updatedUsers[0] : null;
    }
};
