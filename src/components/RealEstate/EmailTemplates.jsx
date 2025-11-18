import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

const EmailTemplates = () => {
    const [activeTab, setActiveTab] = useState('starter');
    const [oneOffEmails, setOneOffEmails] = useState([
        {
            id: 1,
            subject: 'Quick Market Update',
            content: 'Hi [First Name],\n\nJust wanted to share a quick market update for your area...',
            created: '2024-01-15',
            category: 'Market Update'
        },
        {
            id: 2,
            subject: 'Property Showing Reminder',
            content: 'Hi [First Name],\n\nJust a friendly reminder about our property showing tomorrow...',
            created: '2024-01-14',
            category: 'Appointment'
        }
    ]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingEmail, setEditingEmail] = useState(null);
    const [newEmail, setNewEmail] = useState({
        subject: '',
        content: '',
        category: 'General'
    });

    const handleAddEmail = () => {
        if (newEmail.subject && newEmail.content) {
            const email = {
                id: Date.now(),
                ...newEmail,
                created: new Date().toISOString().split('T')[0]
            };
            setOneOffEmails([...oneOffEmails, email]);
            setNewEmail({ subject: '', content: '', category: 'General' });
            setShowAddForm(false);
        }
    };

    const handleEditEmail = (email) => {
        setEditingEmail(email);
        setNewEmail({
            subject: email.subject,
            content: email.content,
            category: email.category
        });
        setShowAddForm(true);
    };

    const handleUpdateEmail = () => {
        if (editingEmail && newEmail.subject && newEmail.content) {
            setOneOffEmails(oneOffEmails.map(email => 
                email.id === editingEmail.id 
                    ? { ...email, ...newEmail }
                    : email
            ));
            setEditingEmail(null);
            setNewEmail({ subject: '', content: '', category: 'General' });
            setShowAddForm(false);
        }
    };

    const handleDeleteEmail = (id) => {
        setOneOffEmails(oneOffEmails.filter(email => email.id !== id));
    };

    const starterTemplates = [
        {
            category: 'Lead Response Sequence',
            templates: [
                {
                    id: 'lead-response-1',
                    subject: 'Thanks for reaching out about [Property/Area]!',
                    content: `Hi [First Name],

Thanks so much for your inquiry! I'm really excited about the chance to help you find your next home.

I'd love to learn a bit more about what you're looking for so I can send you the best options. Are you free for a quick 15-minute chat this week? I have Tuesday at 2pm or Wednesday at 10am available.

In the meantime, I'll keep an eye out for anything that might be perfect for you.

Talk soon!
[Your Name]
[Phone Number]`,
                    notes: 'Send: Within 1 hour of lead inquiry | Purpose: Immediate response to build trust and schedule consultation'
                },
                {
                    id: 'lead-response-2',
                    subject: '[First Name], quick follow-up on your home search',
                    content: `Hey [First Name],

I wanted to follow up on my last email about getting together for a chat. I know how busy life gets!

I've actually been keeping an eye on the market in [Area] and there are some interesting developments happening. Would love to share what I'm seeing and hear more about your timeline.

If this week doesn't work, I'm pretty flexible next week too. Just hit reply and let me know what works best for you.

Best,
[Your Name]
[Phone Number]`,
                    notes: 'Send: 3 days after initial response if no reply | Purpose: Gentle follow-up with market insights'
                },
                {
                    id: 'lead-response-3',
                    subject: 'New listings in [Area] - thought you\'d want to see these',
                    content: `Hi [First Name],

A few new properties just hit the market in [Area] that caught my attention. Based on what you mentioned about wanting [specific criteria], I thought you might be interested.

I don't want to spam your inbox, but I'd hate for you to miss out if one of these is "the one." Would it be helpful if I sent you a quick overview of what's new each week?

Either way, I'm here when you're ready to take the next step.

Talk soon,
[Your Name]
[Phone Number]`,
                    notes: 'Send: 1 week after initial contact | Purpose: Provide value with relevant listings, gauge interest level'
                }
            ]
        },
        {
            category: 'Buyer Nurture Sequence',
            templates: [
                {
                    id: 'buyer-nurture-1',
                    subject: 'Your home search game plan',
                    content: `Hi [First Name],

Hope you're having a great week! I've been thinking about our conversation and wanted to share a few thoughts on your home search.

Based on what you're looking for, here's what I'd suggest:
• Get pre-approved first (I have some great lender recommendations)
• Start looking at 3-4 neighborhoods to get a feel for the market
• Be ready to move quickly when we find the right one

The market's been pretty active lately, but there are definitely good opportunities for buyers who are prepared.

Want to grab coffee this week and talk strategy?

[Your Name]
[Phone Number]`,
                    notes: 'Send: To engaged leads who haven\'t scheduled consultation | Purpose: Position yourself as advisor, create urgency'
                },
                {
                    id: 'buyer-nurture-2',
                    subject: '[First Name], market update for [Area]',
                    content: `Hey [First Name],

Quick market update for [Area] - I know you were interested in this neighborhood.

What I'm seeing:
• Average days on market: [X] days
• Recent sales: [Price range]
• Inventory: [High/Medium/Low]

Bottom line: [Brief market assessment - buyer's market, competitive, etc.]

This might affect your timeline, so wanted to keep you in the loop. Let me know if you want to chat about what this means for your search.

[Your Name]
[Phone Number]`,
                    notes: 'Send: Monthly to active prospects | Purpose: Demonstrate market expertise, maintain engagement'
                }
            ]
        },
        {
            category: 'Seller Lead Templates',
            templates: [
                {
                    id: 'seller-1',
                    subject: 'Your home value estimate for [Address]',
                    content: `Hi [First Name],

Thanks for requesting a home valuation! I've done some research on your property at [Address].

Based on recent sales in your area, I estimate your home's current market value is around [Price Range]. But honestly, there are a few factors that could push it higher or lower, and I'd love to walk through those with you.

Would you be interested in a quick in-person consultation? I can give you a much more accurate number and share some ideas on how to maximize your sale price.

I'm free [Day] at [Time] or [Day] at [Time]. Should take about 30 minutes.

Let me know what works!
[Your Name]
[Phone Number]`,
                    notes: 'Send: Within 2 hours of home valuation request | Purpose: Provide initial value estimate, schedule listing consultation'
                },
                {
                    id: 'seller-2',
                    subject: 'Recent sales near [Address] - market\'s moving!',
                    content: `Hey [First Name],

Wanted to give you a quick update on your neighborhood. Three homes similar to yours have sold in the past month:

• [Address] - [Beds/Baths] - $[Price] - [Days on market] days
• [Address] - [Beds/Baths] - $[Price] - [Days on market] days
• [Address] - [Beds/Baths] - $[Price] - [Days on market] days

The market's definitely active right now. If you've been thinking about selling, this could be a great time to make a move.

Want to chat about what your home might sell for in today's market?

[Your Name]
[Phone Number]`,
                    notes: 'Send: When comparable sales occur near prospect\'s property | Purpose: Create urgency with market activity, generate listing leads'
                }
            ]
        },
        {
            category: 'Past Client Stay-in-Touch',
            templates: [
                {
                    id: 'past-client-1',
                    subject: 'How\'s the new place treating you?',
                    content: `Hi [First Name],

Can't believe it's already been [Time Period] since we closed on [Address]! Time flies.

How are you settling in? I drive by that neighborhood pretty regularly and always think of you guys. Hope you're loving it as much as I thought you would.

If you need any local recommendations - contractors, restaurants, whatever - just let me know. I've got a whole list of great people.

And of course, if you know anyone looking to buy or sell, I'd love to help them out too.

Take care!
[Your Name]
[Phone Number]`,
                    notes: 'Send: 3 months, 6 months, and annually after closing | Purpose: Maintain relationship, generate referrals'
                },
                {
                    id: 'past-client-2',
                    subject: '[First Name], your home\'s value update',
                    content: `Hey [First Name],

I was putting together some market reports and thought you'd be interested to know what's been happening in your neighborhood.

Your home at [Address] has likely appreciated to around $[New Estimate] based on recent sales nearby. That's up about [Percentage]% from when you bought it!

Not suggesting you should sell - just thought you'd like to know you made a great investment. The [Neighborhood] market has been really strong.

Hope you and the family are doing well!

[Your Name]
[Phone Number]`,
                    notes: 'Send: Annually to past clients | Purpose: Show ongoing value, stay top-of-mind, potential future listing'
                }
            ]
        },
        {
            category: 'Referral Request Templates',
            templates: [
                {
                    id: 'referral-1',
                    subject: 'Quick favor?',
                    content: `Hi [First Name],

Hope you're doing well! I wanted to reach out because my business is growing mainly through referrals from great clients like you.

If you know anyone who's thinking about buying or selling, I'd love the chance to help them out. I promise to take as good care of them as I did with you.

No pressure at all - just wanted you to know I'm here if anyone needs a real estate agent they can trust.

Thanks for being awesome!
[Your Name]
[Phone Number]`,
                    notes: 'Send: 6 months after successful transaction | Purpose: Direct referral request to satisfied clients'
                }
            ]
        },
        {
            category: 'Re-engagement Templates',
            templates: [
                {
                    id: 're-engagement-1',
                    subject: '[First Name], still looking for a home?',
                    content: `Hey [First Name],

It's been a while since we last talked about your home search. I know life gets busy and sometimes the timing just isn't right.

I wanted to check in and see if you're still looking, or if your plans have changed. No worries either way - just don't want you to think I forgot about you!

If you're still in the market, I've got some new listings that might be worth a look. If not, no problem at all.

Either way, hope you're doing well.

[Your Name]
[Phone Number]`,
                    notes: 'Send: To cold leads after 60-90 days of no contact | Purpose: Re-qualify dormant leads, clean database'
                },
                {
                    id: 're-engagement-2',
                    subject: 'Last email (promise!) - [First Name]',
                    content: `Hi [First Name],

I don't want to keep bothering you, so this will be my last email unless you reach out.

I know you were interested in [Area/Property Type] at some point, and I just wanted you to know that I'm still here if your situation changes.

My contact info is below if you ever need anything real estate related - even just a question or market update.

Take care!
[Your Name]
[Phone Number]`,
                    notes: 'Send: Final email to unresponsive leads after 120 days | Purpose: Respectful goodbye that often generates responses'
                }
            ]
        }
    ];

    const powerStackTemplates = [
        {
            category: 'Immediate Response Templates',
            templates: [
                {
                    id: 'immediate-1',
                    subject: 'Got 15 minutes for a market reality check?',
                    content: `Hey [First Name],

I just got back from a listing appointment where the seller said something that made me think of our conversation.

They asked: "Should we wait for the market to improve before selling?"

Here's what I told them (and what I wish every buyer/seller knew):

The "perfect" market doesn't exist. But smart opportunities happen every single month if you know what to look for.

I've got 15 minutes this week to give you an honest assessment of what's happening in your price range and area. No sales pitch - just straight talk about what I'm seeing.

Worth a quick call?

[Your Name]
[Phone Number]`,
                    notes: 'Use when: Lead has gone cold or seems hesitant | Purpose: Re-engage with value and market insight'
                },
                {
                    id: 'immediate-2',
                    subject: '[First Name] - found something you need to see',
                    content: `Hi [First Name],

I know you said you wanted to take your time, but I just saw something come on the market that's exactly what you described.

The property: [Brief description matching their criteria]
The catch: It's priced $20K under what I'd expect, and I think that's intentional
My guess: The sellers want a quick, clean sale

I'm showing it to another client tomorrow, but I could squeeze you in today at 4pm or 6pm if you want to see it first.

Even if this isn't "the one," it would give us a good baseline for what's possible in your budget.

Interested?

[Your Name]
[Phone Number]`,
                    notes: 'Use when: Perfect property match becomes available | Purpose: Create urgency for qualified buyers'
                }
            ]
        },
        {
            category: 'Market Update Templates',
            templates: [
                {
                    id: 'market-1',
                    subject: 'Weird thing happening in [Area] - thought you should know',
                    content: `Hi [First Name],

Something interesting is happening in [Area] that I thought you'd want to know about.

What I'm seeing: [Specific market trend - could be inventory, prices, days on market, etc.]

What this means: [Plain English explanation]

For you specifically: [How this impacts their situation]

I've been doing this for [X years] and this kind of shift usually leads to [predicted outcome] within the next few months.

Not trying to pressure you at all - just want to make sure you have the full picture when you're making your decision.

Questions about what this means for your timeline?

[Your Name]`,
                    notes: 'Use when: Significant market shift occurs in their area of interest | Purpose: Position as market expert, create urgency'
                },
                {
                    id: 'market-2',
                    subject: 'Quick question about your home buying budget',
                    content: `Hey [First Name],

I was reviewing what you told me about your budget, and I want to make sure I'm not missing any opportunities for you.

Quick question: When you said [Budget Amount], did that include everything (down payment, closing costs, moving expenses) or just the purchase price?

The reason I ask is that I see a lot of buyers accidentally limit themselves by not understanding all the financing options available.

For example, I just helped someone in a similar situation get into a $350K house with only $15K out of pocket by using [specific program/strategy].

Might be worth a quick conversation to make sure you're seeing everything that's actually within reach.

Free for a 10-minute call this week?

[Your Name]`,
                    notes: 'Use when: Want to expand budget conversation or re-qualify buyer | Purpose: Uncover higher budget, demonstrate financing expertise'
                }
            ]
        },
        {
            category: 'Seller-Specific Templates',
            templates: [
                {
                    id: 'seller-1',
                    subject: 'The $30K mistake I see sellers make',
                    content: `Hi [First Name],

I was just at a listing appointment where the seller said something I hear way too often:

"We'll just price it high and see what happens. We can always come down."

Here's the problem with that strategy: the first 2 weeks on the market are everything. That's when you get the most views, the most showings, and the best offers.

Price it too high initially and you miss that window. Even if you drop the price later, buyers wonder "what's wrong with it?"

I've seen this cost sellers $20K-$30K in lost value.

The smarter approach: Price strategically from day one to create competition and drive up the final sale price.

I actually have examples of how this worked for 3 recent clients if you're curious.

Worth discussing your situation?

[Your Name]`,
                    notes: 'Use when: Following up with seller leads or past seller consultations | Purpose: Educate on pricing strategy, generate listing appointments'
                },
                {
                    id: 'seller-2',
                    subject: 'Your neighbors are asking about you',
                    content: `Hey [First Name],

This might sound strange, but your neighbors have been asking about you!

I've been working with a few people who want to buy in your neighborhood, and when I mention [Your Street/Area], they always ask: "What about the house at [Their Address]? Are those people planning to sell?"

Apparently your house has great curb appeal and everyone notices it when they drive through.

I always tell them you're not selling (because that's what you told me), but it got me thinking...

If you ever did want to test the waters, you'd probably have multiple buyers interested before we even put it on the market.

No pressure at all - just thought you'd want to know you're sitting on what appears to be a very desirable property.

Curious what it might be worth in today's market?

[Your Name]`,
                    notes: 'Use when: Have buyers interested in their neighborhood | Purpose: Create FOMO and generate listing interest'
                }
            ]
        },
        {
            category: 'Event-Based Templates',
            templates: [
                {
                    id: 'event-1',
                    subject: 'Open house this weekend - bringing clients through',
                    content: `Hi [First Name],

Just wanted to give you a heads up - I'm bringing 2 clients to the open house at [Address] this Saturday.

I know you were interested in that area, so thought you might want to check it out too.

What I like about this one:
• [Specific feature that matches their criteria]
• [Another appealing aspect]
• [Third selling point]

What gives me pause: [Honest concern or consideration]

Open house details:
📍 [Address]
🕐 Saturday, [Time]
💰 Listed at $[Price]

Want to meet up there and walk through it together? Always helpful to have a second perspective.

[Your Name]`,
                    notes: 'Use when: Open house in their area of interest | Purpose: Provide value, encourage face-to-face meeting'
                },
                {
                    id: 'event-2',
                    subject: 'Rate news - this could change things for you',
                    content: `Hey [First Name],

Not sure if you saw the news, but mortgage rates just [increased/decreased] to [current rate]%.

Here's what this means for your situation:

[If rates went down:]
Your buying power just increased by about $[amount] based on the budget you mentioned. That opens up [number] more properties in [area].

[If rates went up:]
If you were on the fence about timing, this might be the push to move sooner rather than later. Waiting could cost you $[amount] per month in payments.

Bottom line: [Specific recommendation based on their situation]

Want to run some quick numbers and see how this affects your search?

[Your Name]`,
                    notes: 'Use when: Significant interest rate changes occur | Purpose: Create urgency, demonstrate market awareness'
                }
            ]
        },
        {
            category: 'Relationship Building Templates',
            templates: [
                {
                    id: 'relationship-1',
                    subject: 'Saw this and thought of you',
                    content: `Hi [First Name],

I was driving through [Neighborhood] yesterday and saw [specific thing - new restaurant, park, development, etc.] and immediately thought of you.

Remember when you mentioned wanting to be close to [specific preference they mentioned]? This would be perfect for that.

[Brief description of what you saw and why it's relevant]

Made me wonder: Are you still thinking about that area, or have your priorities shifted since we last talked?

Either way is totally fine - just want to make sure I'm focused on the right things when I'm out there keeping an eye on the market for you.

Hope you're doing well!

[Your Name]`,
                    notes: 'Use when: You notice something relevant to their preferences | Purpose: Show you\'re thinking of them, re-qualify current needs'
                },
                {
                    id: 'relationship-2',
                    subject: 'Quick favor - need your opinion',
                    content: `Hey [First Name],

Hope you don't mind me asking, but I could use your perspective on something.

I'm working with another client who's in a similar situation to what you described - [brief similarity]. They're trying to decide between [option A] and [option B].

Based on your experience looking in [area/price range], what would you prioritize?

I know you put a lot of thought into what you were looking for, so I'd value your input.

No rush at all - just thought you might have some insight that would help them make a good decision.

PS: How are things going with your search? Anything new I should be keeping an eye out for?

Thanks!
[Your Name]`,
                    notes: 'Use when: Want to re-engage dormant lead while providing value | Purpose: Make them feel valued, naturally re-open conversation'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20 text-center">
                    <div className="w-16 h-16 bg-orange-500 rounded-xl mx-auto mb-6 flex items-center justify-center text-2xl font-bold">
                        ✉️
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-teal-400">Email Templates</h1>
                    <p className="text-gray-300 text-lg">
                        Professional email templates for every stage of your real estate business
                    </p>
                </div>

                {/* Tab Navigation */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
                    <div className="flex space-x-4 mb-6">
                        <button
                            onClick={() => setActiveTab('starter')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === 'starter'
                                    ? 'bg-teal-400 text-slate-800'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                        >
                            Starter Stack Templates
                        </button>
                        <button
                            onClick={() => setActiveTab('oneoff')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                                activeTab === 'oneoff'
                                    ? 'bg-teal-400 text-slate-800'
                                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                        >
                            Power Stack Templates
                        </button>
                    </div>

                    {/* Power Stack Templates Tab */}
                    {activeTab === 'oneoff' && (
                        <div>
                            <h2 className="text-2xl font-bold text-teal-400 mb-6">Power Stack Templates</h2>
                            
                            {/* Power Stack Template Categories */}
                            {powerStackTemplates.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
                                    <h2 className="text-2xl font-bold mb-6 text-teal-400 border-b-2 border-teal-400 pb-2">
                                        {category.category}
                                    </h2>

                                    <div className="space-y-6">
                                        {category.templates.map((template, templateIndex) => (
                                            <div key={template.id} className="bg-white/5 rounded-xl p-6 border-l-4 border-yellow-400">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-bold text-yellow-400 mb-3">
                                                        Subject: {template.subject}
                                                    </h3>

                                                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                                                        <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">
                                                            {template.content}
                                                        </pre>
                                                    </div>

                                                    <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4">
                                                        <p className="text-teal-400 text-sm font-medium">
                                                            <strong>Usage:</strong> {template.notes}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Print Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-teal-400 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-400/30"
                                >
                                    Print Power Stack Templates
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Starter Stack Templates Tab */}
                    {activeTab === 'starter' && (
                        <div>
                            <h2 className="text-2xl font-bold text-teal-400 mb-6">Starter Stack Templates</h2>
                            
                            {/* Template Categories */}
                            {starterTemplates.map((category, categoryIndex) => (
                                <div key={categoryIndex} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
                                    <h2 className="text-2xl font-bold mb-6 text-teal-400 border-b-2 border-teal-400 pb-2">
                                        {category.category}
                                    </h2>

                                    <div className="space-y-6">
                                        {category.templates.map((template, templateIndex) => (
                                            <div key={template.id} className="bg-white/5 rounded-xl p-6 border-l-4 border-yellow-400">
                                                <div className="mb-4">
                                                    <h3 className="text-lg font-bold text-yellow-400 mb-3">
                                                        Subject: {template.subject}
                                                    </h3>

                                                    <div className="bg-white/5 rounded-lg p-4 mb-4">
                                                        <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">
                                                            {template.content}
                                                        </pre>
                                                    </div>

                                                    <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4">
                                                        <p className="text-teal-400 text-sm font-medium">
                                                            <strong>Usage:</strong> {template.notes}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {/* Print Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => window.print()}
                                    className="bg-teal-400 text-slate-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-teal-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-400/30"
                                >
                                    Print Email Templates
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Print Styles */}
            <style jsx>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print-button { display: none !important; }
          .bg-white\\/10, .bg-white\\/5, .bg-gradient-to-br {
            background: white !important;
            border: 1px solid #ccc !important;
          }
          .border-l-4 {
            border-left: 4px solid #000 !important;
          }
          .bg-teal-400\\/10 {
            background: #f0f0f0 !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
          .text-teal-400, .text-yellow-400 {
            color: #000 !important;
          }
        }
      `}</style>
        </div>
    );
};

export default EmailTemplates;