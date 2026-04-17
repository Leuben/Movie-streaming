import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContent';

import './Subscription.scss';

const plans = [
    {
        name: 'Basic',
        price: '$5 / month',
        benefits: [
            'Access to standard catalog',
            '1 device streaming',
            'Email support'
        ]
    },
    {
        name: 'Premium',
        price: '$12 / month',
        benefits: [
            'All catalog access',
            '4 device streaming',
            'Priority support'
        ]
    }
];

export default function Subscription() {
    const { currentUser, subscribe, isLoggedIn } = useData();

    if (!isLoggedIn) {
        return (
            <div className="subscription-page">
                <div className="subscription-card">
                    <h1>Subscription plans require login</h1>
                    <p>Please log in to manage your plan.</p>

                    <Link to="/login" className="subscription-link">
                        Login to my account
                    </Link>

                    <Link to="/register" className="subscription-link secondary">
                        Create My Own Account
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="subscription-page">

            <Typography variant="h4" component="h1" gutterBottom>
                Subscription Plans
            </Typography>

            <Typography className="subscription-subheading">
                Choose the plan that fits your streaming needs.
            </Typography>

            <div className="subscription-current">
                Current plan: {currentUser?.subscription ?? 'None'}
            </div>

            <div className="subscription-options">
                {plans.map((plan) => (
                    <div key={plan.name} className="subscription-plan-card">

                        <div>
                            <Typography variant="h6">
                                {plan.name}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                {plan.price}
                            </Typography>
                        </div>

                        <ul className="subscription-benefits">
                            {plan.benefits.map((benefit) => (
                                <li key={benefit}>
                                    {benefit}
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant="contained"
                            className="subscription-button"
                            onClick={() => subscribe(plan.name)}
                        >
                            Choose {plan.name}
                        </Button>

                    </div>
                ))}
            </div>
        </div>
    );
}