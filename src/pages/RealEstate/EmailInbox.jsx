import { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
    Search,
    Mail,
    Send,
    Inbox,
    Star,
    Archive,
    Trash2,
    Filter,
    Plus,
    RefreshCw,
    MoreVertical,
    Paperclip,
    Reply,
    ReplyAll,
    Forward,
    X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { apiBaseUrl } from "../../store/api.config";
// API imports - commented out for now
// import {
//   useGetEmailsQuery,
//   useSendEmailMutation,
//   useReplyToEmailMutation,
//   useMarkEmailAsReadMutation,
//   useToggleEmailStarMutation,
//   useDeleteEmailMutation,
// } from "../../store/apis/emails.api";

/* --------------------------- helpers --------------------------- */

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 days
        return date.toLocaleDateString([], { weekday: 'short' });
    } else {
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
}

/* ------------------------ Email Compose Modal --------------------------- */

function EmailComposeModal({ open, onClose, replyTo = null, onSendEmail }) {
    const [form, setForm] = useState({
        to: replyTo?.from || "",
        subject: replyTo ? `Re: ${replyTo.subject}` : "",
        body: replyTo ? `\n\n--- Original Message ---\n${replyTo.body}` : "",
        attachments: [],
    });
    const [isSending, setIsSending] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [selectedEmailTemplate, setSelectedEmailTemplate] = useState("");
    const [selectedSequenceDay, setSelectedSequenceDay] = useState("");
    const [selectedAutomatedSequence, setSelectedAutomatedSequence] = useState("");
    const [selectedAutomatedEmail, setSelectedAutomatedEmail] = useState("");
    const [selectedRandomTemplate, setSelectedRandomTemplate] = useState("");

    // Check for stored email data from Open House Toolkit
    useEffect(() => {
        if (open) {
            const storedEmailData = sessionStorage.getItem('openHouseEmailData');
            if (storedEmailData) {
                try {
                    const emailData = JSON.parse(storedEmailData);
                    setForm({
                        to: emailData.to,
                        subject: emailData.subject,
                        body: emailData.body,
                        attachments: [],
                    });
                    // Clear the stored data after using it
                    sessionStorage.removeItem('openHouseEmailData');
                    console.log("Auto-populated email from Open House Toolkit:", emailData.visitorName);
                } catch (error) {
                    console.error("Error parsing stored email data:", error);
                }
            }
        }
    }, [open]);

    // Email templates data extracted from email_templates.html
    const emailTemplates = [
        {
            id: "lead-response-1",
            name: "Thanks for reaching out about [Property/Area]!",
            subject: "Thanks for reaching out about [Property/Area]!",
            body: `Hi [First Name],

Thanks so much for your inquiry! I'm really excited about the chance to help you find your next home.

I'd love to learn a bit more about what you're looking for so I can send you the best options. Are you free for a quick 15-minute chat this week? I have Tuesday at 2pm or Wednesday at 10am available.

In the meantime, I'll keep an eye out for anything that might be perfect for you.

Talk soon!
[Your Name]
[Phone Number]`
        },
        {
            id: "lead-response-2",
            name: "[First Name], quick follow-up on your home search",
            subject: "[First Name], quick follow-up on your home search",
            body: `Hey [First Name],

I wanted to follow up on my last email about getting together for a chat. I know how busy life gets!

I've actually been keeping an eye on the market in [Area] and there are some interesting developments happening. Would love to share what I'm seeing and hear more about your timeline.

If this week doesn't work, I'm pretty flexible next week too. Just hit reply and let me know what works best for you.

Best,
[Your Name]
[Phone Number]`
        },
        {
            id: "lead-response-3",
            name: "New listings in [Area] - thought you'd want to see these",
            subject: "New listings in [Area] - thought you'd want to see these",
            body: `Hi [First Name],

A few new properties just hit the market in [Area] that caught my attention. Based on what you mentioned about wanting [specific criteria], I thought you might be interested.

I don't want to spam your inbox, but I'd hate for you to miss out if one of these is "the one." Would it be helpful if I sent you a quick overview of what's new each week?

Either way, I'm here when you're ready to take the next step.

Talk soon,
[Your Name]
[Phone Number]`
        },
        {
            id: "buyer-nurture-1",
            name: "Your home search game plan",
            subject: "Your home search game plan",
            body: `Hi [First Name],

Hope you're having a great week! I've been thinking about our conversation and wanted to share a few thoughts on your home search.

Based on what you're looking for, here's what I'd suggest:
• Get pre-approved first (I have some great lender recommendations)
• Start looking at 3-4 neighborhoods to get a feel for the market
• Be ready to move quickly when we find the right one

The market's been pretty active lately, but there are definitely good opportunities for buyers who are prepared.

Want to grab coffee this week and talk strategy?

[Your Name]
[Phone Number]`
        },
        {
            id: "buyer-nurture-2",
            name: "[First Name], market update for [Area]",
            subject: "[First Name], market update for [Area]",
            body: `Hey [First Name],

Quick market update for [Area] - I know you were interested in this neighborhood.

What I'm seeing:
• Average days on market: [X] days
• Recent sales: [Price range]
• Inventory: [High/Medium/Low]

Bottom line: [Brief market assessment - buyer's market, competitive, etc.]

This might affect your timeline, so wanted to keep you in the loop. Let me know if you want to chat about what this means for your search.

[Your Name]
[Phone Number]`
        },
        {
            id: "seller-lead-1",
            name: "Your home value estimate for [Address]",
            subject: "Your home value estimate for [Address]",
            body: `Hi [First Name],

Thanks for requesting a home valuation! I've done some research on your property at [Address].

Based on recent sales in your area, I estimate your home's current market value is around [Price Range]. But honestly, there are a few factors that could push it higher or lower, and I'd love to walk through those with you.

Would you be interested in a quick in-person consultation? I can give you a much more accurate number and share some ideas on how to maximize your sale price.

I'm free [Day] at [Time] or [Day] at [Time]. Should take about 30 minutes.

Let me know what works!
[Your Name]
[Phone Number]`
        },
        {
            id: "seller-lead-2",
            name: "Recent sales near [Address] - market's moving!",
            subject: "Recent sales near [Address] - market's moving!",
            body: `Hey [First Name],

Wanted to give you a quick update on your neighborhood. Three homes similar to yours have sold in the past month:

• [Address] - [Beds/Baths] - $[Price] - [Days on market] days
• [Address] - [Beds/Baths] - $[Price] - [Days on market] days
• [Address] - [Beds/Baths] - $[Price] - [Days on market] days

The market's definitely active right now. If you've been thinking about selling, this could be a great time to make a move.

Want to chat about what your home might sell for in today's market?

[Your Name]
[Phone Number]`
        },
        {
            id: "past-client-1",
            name: "How's the new place treating you?",
            subject: "How's the new place treating you?",
            body: `Hi [First Name],

Can't believe it's already been [Time Period] since we closed on [Address]! Time flies.

How are you settling in? I drive by that neighborhood pretty regularly and always think of you guys. Hope you're loving it as much as I thought you would.

If you need any local recommendations - contractors, restaurants, whatever - just let me know. I've got a whole list of great people.

And of course, if you know anyone looking to buy or sell, I'd love to help them out too.

Take care!
[Your Name]
[Phone Number]`
        },
        {
            id: "past-client-2",
            name: "[First Name], your home's value update",
            subject: "[First Name], your home's value update",
            body: `Hey [First Name],

I was putting together some market reports and thought you'd be interested to know what's been happening in your neighborhood.

Your home at [Address] has likely appreciated to around $[New Estimate] based on recent sales nearby. That's up about [Percentage]% from when you bought it!

Not suggesting you should sell - just thought you'd like to know you made a great investment. The [Neighborhood] market has been really strong.

Hope you and the family are doing well!

[Your Name]
[Phone Number]`
        },
        {
            id: "referral-1",
            name: "Quick favor?",
            subject: "Quick favor?",
            body: `Hi [First Name],

Hope you're doing well! I wanted to reach out because my business is growing mainly through referrals from great clients like you.

If you know anyone who's thinking about buying or selling, I'd love the chance to help them out. I promise to take as good care of them as I did with you.

No pressure at all - just wanted you to know I'm here if anyone needs a real estate agent they can trust.

Thanks for being awesome!
[Your Name]
[Phone Number]`
        },
        {
            id: "re-engagement-1",
            name: "[First Name], still looking for a home?",
            subject: "[First Name], still looking for a home?",
            body: `Hey [First Name],

It's been a while since we last talked about your home search. I know life gets busy and sometimes the timing just isn't right.

I wanted to check in and see if you're still looking, or if your plans have changed. No worries either way - just don't want you to think I forgot about you!

If you're still in the market, I've got some new listings that might be worth a look. If not, no problem at all.

Either way, hope you're doing well.

[Your Name]
[Phone Number]`
        },
        {
            id: "re-engagement-2",
            name: "Last email (promise!) - [First Name]",
            subject: "Last email (promise!) - [First Name]",
            body: `Hi [First Name],

I don't want to keep bothering you, so this will be my last email unless you reach out.

I know you were interested in [Area/Property Type] at some point, and I just wanted you to know that I'm still here if your situation changes.

My contact info is below if you ever need anything real estate related - even just a question or market update.

Take care!
[Your Name]
[Phone Number]`
        }
    ];

    // Manual email templates data extracted from manual_email_templates.html
    const manualEmailTemplates = [
        {
            id: "market-reality-check",
            name: "Got 15 minutes for a market reality check?",
            subject: "Got 15 minutes for a market reality check?",
            body: `Hey [First Name],

I just got back from a listing appointment where the seller said something that made me think of our conversation.

They asked: "Should we wait for the market to improve before selling?"

Here's what I told them (and what I wish every buyer/seller knew):

The "perfect" market doesn't exist. But smart opportunities happen every single month if you know what to look for.

I've got 15 minutes this week to give you an honest assessment of what's happening in your price range and area. No sales pitch - just straight talk about what I'm seeing.

Worth a quick call?

[Your Name]
[Phone Number]`,
            purpose: "Re-engage with value and market insight",
            useWhen: "Lead has gone cold or seems hesitant"
        },
        {
            id: "found-something-perfect",
            name: "[First Name] - found something you need to see",
            subject: "[First Name] - found something you need to see",
            body: `Hi [First Name],

I know you said you wanted to take your time, but I just saw something come on the market that's exactly what you described.

The property: [Brief description matching their criteria]
The catch: It's priced $20K under what I'd expect, and I think that's intentional
My guess: The sellers want a quick, clean sale

I'm showing it to another client tomorrow, but I could squeeze you in today at 4pm or 6pm if you want to see it first.

Even if this isn't "the one," it would give us a good baseline for what's possible in your budget.

Interested?

[Your Name]
[Phone Number]`,
            purpose: "Create urgency for qualified buyers",
            useWhen: "Perfect property match becomes available"
        },
        {
            id: "market-shift-update",
            name: "Weird thing happening in [Area] - thought you should know",
            subject: "Weird thing happening in [Area] - thought you should know",
            body: `Hi [First Name],

Something interesting is happening in [Area] that I thought you'd want to know about.

What I'm seeing: [Specific market trend - could be inventory, prices, days on market, etc.]

What this means: [Plain English explanation]

For you specifically: [How this impacts their situation]

I've been doing this for [X years] and this kind of shift usually leads to [predicted outcome] within the next few months.

Not trying to pressure you at all - just want to make sure you have the full picture when you're making your decision.

Questions about what this means for your timeline?

[Your Name]`,
            purpose: "Position as market expert, create urgency",
            useWhen: "Significant market shift occurs in their area of interest"
        },
        {
            id: "budget-qualification",
            name: "Quick question about your home buying budget",
            subject: "Quick question about your home buying budget",
            body: `Hey [First Name],

I was reviewing what you told me about your budget, and I want to make sure I'm not missing any opportunities for you.

Quick question: When you said [Budget Amount], did that include everything (down payment, closing costs, moving expenses) or just the purchase price?

The reason I ask is that I see a lot of buyers accidentally limit themselves by not understanding all the financing options available.

For example, I just helped someone in a similar situation get into a $350K house with only $15K out of pocket by using [specific program/strategy].

Might be worth a quick conversation to make sure you're seeing everything that's actually within reach.

Free for a 10-minute call this week?

[Your Name]`,
            purpose: "Uncover higher budget, demonstrate financing expertise",
            useWhen: "Want to expand budget conversation or re-qualify buyer"
        },
        {
            id: "seller-pricing-mistake",
            name: "The $30K mistake I see sellers make",
            subject: "The $30K mistake I see sellers make",
            body: `Hi [First Name],

I was just at a listing appointment where the seller said something I hear way too often:

"We'll just price it high and see what happens. We can always come down."

Here's the problem with that strategy: the first 2 weeks on the market are everything. That's when you get the most views, the most showings, and the best offers.

Price it too high initially and you miss that window. Even if you drop the price later, buyers wonder "what's wrong with it?"

I've seen this cost sellers $20K-$30K in lost value.

The smarter approach: Price strategically from day one to create competition and drive up the final sale price.

I actually have examples of how this worked for 3 recent clients if you're curious.

Worth discussing your situation?

[Your Name]`,
            purpose: "Educate on pricing strategy, generate listing appointments",
            useWhen: "Following up with seller leads or past seller consultations"
        },
        {
            id: "neighbor-interest",
            name: "Your neighbors are asking about you",
            subject: "Your neighbors are asking about you",
            body: `Hey [First Name],

This might sound strange, but your neighbors have been asking about you!

I've been working with a few people who want to buy in your neighborhood, and when I mention [Your Street/Area], they always ask: "What about the house at [Their Address]? Are those people planning to sell?"

Apparently your house has great curb appeal and everyone notices it when they drive through.

I always tell them you're not selling (because that's what you told me), but it got me thinking...

If you ever did want to test the waters, you'd probably have multiple buyers interested before we even put it on the market.

No pressure at all - just thought you'd want to know you're sitting on what appears to be a very desirable property.

Curious what it might be worth in today's market?

[Your Name]`,
            purpose: "Create FOMO and generate listing interest",
            useWhen: "Have buyers interested in their neighborhood"
        },
        {
            id: "open-house-invite",
            name: "Open house this weekend - bringing clients through",
            subject: "Open house this weekend - bringing clients through",
            body: `Hi [First Name],

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
            purpose: "Provide value, encourage face-to-face meeting",
            useWhen: "Open house in their area of interest"
        },
        {
            id: "rate-news-update",
            name: "Rate news - this could change things for you",
            subject: "Rate news - this could change things for you",
            body: `Hey [First Name],

Not sure if you saw the news, but mortgage rates just [increased/decreased] to [current rate]%.

Here's what this means for your situation:

[If rates went down:]
Your buying power just increased by about $[amount] based on the budget you mentioned. That opens up [number] more properties in [area].

[If rates went up:]
If you were on the fence about timing, this might be the push to move sooner rather than later. Waiting could cost you $[amount] per month in payments.

Bottom line: [Specific recommendation based on their situation]

Want to run some quick numbers and see how this affects your search?

[Your Name]`,
            purpose: "Create urgency, demonstrate market awareness",
            useWhen: "Significant interest rate changes occur"
        },
        {
            id: "thought-of-you",
            name: "Saw this and thought of you",
            subject: "Saw this and thought of you",
            body: `Hi [First Name],

I was driving through [Neighborhood] yesterday and saw [specific thing - new restaurant, park, development, etc.] and immediately thought of you.

Remember when you mentioned wanting to be close to [specific preference they mentioned]? This would be perfect for that.

[Brief description of what you saw and why it's relevant]

Made me wonder: Are you still thinking about that area, or have your priorities shifted since we last talked?

Either way is totally fine - just want to make sure I'm focused on the right things when I'm out there keeping an eye on the market for you.

Hope you're doing well!

[Your Name]`,
            purpose: "Show you're thinking of them, re-qualify current needs",
            useWhen: "You notice something relevant to their preferences"
        },
        {
            id: "need-your-opinion",
            name: "Quick favor - need your opinion",
            subject: "Quick favor - need your opinion",
            body: `Hey [First Name],

Hope you don't mind me asking, but I could use your perspective on something.

I'm working with another client who's in a similar situation to what you described - [brief similarity]. They're trying to decide between [option A] and [option B].

Based on your experience looking in [area/price range], what would you prioritize?

I know you put a lot of thought into what you were looking for, so I'd value your input.

No rush at all - just thought you might have some insight that would help them make a good decision.

PS: How are things going with your search? Anything new I should be keeping an eye out for?

Thanks!
[Your Name]`,
            purpose: "Make them feel valued, naturally re-open conversation",
            useWhen: "Want to re-engage dormant lead while providing value"
        },
        // PRO PLAN MANUAL TEMPLATES - High-Value Prospect Templates
        {
            id: "unicorn-property",
            name: "[First Name], I think I found your unicorn property",
            subject: "[First Name], I think I found your unicorn property",
            body: `Hi [First Name],

I rarely get this excited about a property match, but something just came across my desk that I think could be exactly what you've been looking for.

Here's why I think it's special:

🎯 Location: [Specific location benefit that matches their stated priorities]
💎 Unique feature: [Something rare they mentioned wanting]
📈 Investment angle: [Appreciation potential or other financial benefit]
⏰ Timing: [Why now is the right moment]

The catch: It's not officially on the market yet. The listing agent is a colleague who's giving me a 48-hour preview for qualified buyers.

I can arrange a private showing tomorrow at 10am or 2pm, but I'll need to move fast to secure it.

My professional opinion: This checks boxes I rarely see in one property. If the numbers work for you, this could save you months of searching.

Interested in seeing it first?

[Your Name]
[Your Title/Credentials]`,
            purpose: "Create exclusivity and urgency for high-value properties",
            useWhen: "Perfect off-market or pre-market property becomes available"
        },
        {
            id: "confidential-market-intel",
            name: "Confidential market intel for [Area] - thought you should know",
            subject: "Confidential market intel for [Area] - thought you should know",
            body: `Hey [First Name],

I just came out of a meeting with [Local Authority/Developer/Major Investor] and learned something about [Area] that's not public knowledge yet.

Here's what's coming: [Specific development/change/investment]

Timeline: [When this will be announced/completed]

Impact on property values: Based on similar developments, I'd expect properties in [specific zone] to appreciate [X%] over the next [timeframe].

The opportunity: There are currently [X] properties available in the impact zone, priced before sellers know about this development.

I'm sharing this with only 3 clients who I think could benefit most. Given your interest in [their specific criteria], you're perfectly positioned to capitalize on this.

Next steps: If this interests you, I can pull together a detailed analysis of the best opportunities and schedule private showings this week.

Want to discuss this confidentially?

[Your Name]
[Your Direct Line]`,
            purpose: "Position as insider with exclusive access, create investment urgency",
            useWhen: "You have exclusive market intelligence or development information"
        },
        {
            id: "luxury-estate-preview",
            name: "Private estate preview - [Property Description]",
            subject: "Private estate preview - [Property Description]",
            body: `Dear [First Name],

I have the privilege of representing an exceptional estate that won't be marketed publicly.

The Property: [Luxury property description with sophisticated language]

What makes it extraordinary:
• [Unique architectural feature or history]
• [Exceptional amenity or location benefit]
• [Investment or lifestyle advantage]
• [Exclusive aspect - privacy, views, etc.]

The Details:
📍 Location: [Premium location with discretion]
🏡 Size: [Square footage, lot size, rooms]
💰 Investment: [Price range with context]
🗓️ Availability: [Exclusive preview timeline]

This property represents [specific lifestyle or investment benefit] and would suit someone who appreciates [sophisticated buyer qualities].

I believe this aligns with your vision of [their stated luxury criteria]. Would you like to arrange a private tour this week?

Please note: Due to the property's significance, all showings require 48-hour advance notice and signed confidentiality agreement.

I look forward to your thoughts.

Best regards,
[Your Full Name]
[Luxury Designations]
[Direct Contact]`,
            purpose: "Maintain sophisticated tone, create exclusivity for luxury market",
            useWhen: "Marketing luxury properties or targeting high-net-worth clients"
        },
        {
            id: "portfolio-diversification",
            name: "Your portfolio diversification opportunity in [Market]",
            subject: "Your portfolio diversification opportunity in [Market]",
            body: `[First Name],

Given your success in [their known business/investment area], I wanted to share an investment opportunity that could complement your existing portfolio.

The Opportunity: [Specific real estate investment - could be development, flip, rental, etc.]

The Numbers:
• Initial investment: $[Amount]
• Projected ROI: [X]% over [timeframe]
• Risk profile: [Low/Medium] (similar to [comparable investment type])
• Tax advantages: [Specific benefits - depreciation, 1031 exchange, etc.]

Why this works for your situation:
Given your [known situation - high tax bracket, need for passive income, etc.], this investment offers [specific benefits that match their needs].

Market timing: [Current market conditions that make this attractive]

I've put together a comprehensive analysis including market comps, financial projections, and exit strategies.

Next step: 30-minute call to walk through the numbers and see if this fits your investment thesis?

I can meet your schedule - including evenings or weekends.

[Your Name]
[Investment-focused credentials]`,
            purpose: "Position real estate as strategic investment, demonstrate financial sophistication",
            useWhen: "Targeting investment-minded clients or high-net-worth individuals"
        },
        {
            id: "algorithm-opportunity",
            name: "Algorithm spotted opportunity: [Address] analysis",
            subject: "Algorithm spotted opportunity: [Address] analysis",
            body: `Hi [First Name],

My proprietary market analysis algorithm flagged [Address] as a significant opportunity based on your search criteria.

Why the algorithm noticed it:

📊 Price Analysis:
• Listed at $[Price] - [X]% below algorithm prediction
• Recent comps suggest value range: $[Range]
• Price per square foot: [X]% below neighborhood average

🏘️ Neighborhood Metrics:
• Appreciation rate: [X]% annually (above city average)
• Days on market trend: Decreasing (seller motivation indicator)
• Future development score: [X]/10 (infrastructure projects planned)

🎯 Match Score: 94/100 based on your preferences

The data suggests: This property is priced for a quick sale, possibly due to [reason - relocation, estate sale, etc.]. Market timing and pricing indicate [X]% potential appreciation within [timeframe].

Potential concerns: [Honest assessment of any red flags the algorithm identified]

My recommendation: View within 48 hours. Properties with this data profile typically receive multiple offers within the first week.

Want to see the full algorithmic analysis and schedule a showing?

[Your Name]
[Technology-focused credentials]`,
            purpose: "Demonstrate technological advantage, provide data-driven recommendations",
            useWhen: "You have sophisticated market analysis tools or data"
        },
        {
            id: "predictive-market-analysis",
            name: "Predictive market analysis: Your area outlook 2025-2027",
            subject: "Predictive market analysis: Your area outlook 2025-2027",
            body: `[First Name],

I just completed my annual predictive analysis for [Area] and wanted to share the findings that directly impact your property interests.

3-Year Market Forecast (2025-2027):

📈 Property Value Predictions:
• [Property Type 1]: [X]% total appreciation
• [Property Type 2]: [X]% total appreciation
• [Neighborhood A]: Outperforming market by [X]%
• [Neighborhood B]: Moderate growth, [X]% annually

🏗️ Development Impact Analysis:
• [Major project 1]: [Impact description and timeline]
• [Major project 2]: [Impact description and timeline]
• Infrastructure investments: $[Amount] allocated for [projects]

💰 Investment Timing Optimization:
• Best buying opportunity: [Specific timeframe and why]
• Optimal selling window: [Specific timeframe and why]
• Hold vs. sell analysis: [Recommendation based on their situation]

For your specific situation: Based on your [timeframe/budget/goals], the data suggests [specific strategic recommendation].

Action items:
1. [Specific recommendation 1]
2. [Specific recommendation 2]
3. [Specific recommendation 3]

I can walk you through the detailed methodology and answer any questions about how this impacts your real estate strategy.

30-minute strategy session this week?

[Your Name]
[Market Analysis Credentials]`,
            purpose: "Position as strategic advisor, demonstrate sophisticated market knowledge",
            useWhen: "Providing comprehensive market forecasting and strategic advice"
        },
        {
            id: "business-connection",
            name: "Introduction to [Industry Contact] - potential synergy",
            subject: "Introduction to [Industry Contact] - potential synergy",
            body: `Hi [First Name],

I was having lunch with [Contact Name], [Their Title] at [Their Company], and your name came up in our conversation about [relevant topic].

Why I thought you two should connect:
• [Contact] mentioned [relevant challenge/opportunity] that aligns with your [client's expertise/interest]
• You both share [common interest/goal/background]
• There could be [specific mutual benefit - referrals, partnerships, etc.]

[Contact Name]'s background: [Brief, impressive bio that would interest your client]

What [Contact] is working on: [Current projects/initiatives that might interest your client]

I think there could be some interesting opportunities for collaboration, or at minimum, you'd enjoy the conversation.

Would you like me to facilitate an introduction? I'm happy to set up a coffee meeting or make a brief email introduction.

No pressure at all - just thought the connection could be mutually beneficial.

Let me know your thoughts!

Best,
[Your Name]`,
            purpose: "Add value beyond real estate, deepen relationship through networking",
            useWhen: "You can facilitate valuable business connections for clients"
        },
        {
            id: "achievement-celebration",
            name: "Congratulations on [Recent Achievement] - and a small celebration",
            subject: "Congratulations on [Recent Achievement] - and a small celebration",
            body: `Dear [First Name],

I saw the news about [specific achievement - promotion, business milestone, award, etc.] - congratulations! [Personal comment showing you understand the significance]

Why this caught my attention: I remember when you mentioned [previous conversation about their goals/challenges], and it's incredible to see how you've [specific progress they've made].

A small celebration: I'd love to take you and [spouse/partner if applicable] to dinner at [upscale restaurant] to celebrate properly. Are you free any evening next week?

No agenda, just genuine congratulations. Though I suspect this achievement might change your housing needs - [thoughtful speculation about how their success might impact real estate plans].

Either way: You've earned a proper celebration, and I'd be honored to host.

Restaurant options I had in mind:
• [Restaurant 1] - [what they're known for]
• [Restaurant 2] - [what they're known for]
• Or anywhere else you've been wanting to try

Just pick a day that works for you!

Again, so proud of what you've accomplished.

Best regards,
[Your Name]`,
            purpose: "Deepen personal relationship, demonstrate genuine care beyond transactions",
            useWhen: "Client achieves significant personal or professional milestone"
        },
        {
            id: "market-disruption-alert",
            name: "Market disruption alert - protective strategy for your interests",
            subject: "Market disruption alert - protective strategy for your interests",
            body: `[First Name],

I'm reaching out immediately because of [market disruption - rate spike, policy change, economic event] that could significantly impact your real estate plans.

What just happened: [Clear explanation of the market event]

Impact on your situation:
• Short-term (next 30 days): [Immediate implications]
• Medium-term (3-6 months): [Likely outcomes]
• Long-term (1+ years): [Strategic considerations]

Protective actions I recommend:
1. Immediate: [Time-sensitive action]
2. This week: [Short-term strategy]
3. This month: [Medium-term positioning]

Opportunities this creates: [How sophisticated clients can benefit from the disruption]

What I'm doing for you:
• Monitoring [specific metrics/indicators]
• Maintaining relationships with [relevant contacts - lenders, developers, etc.]
• Tracking [specific opportunities] that could benefit your situation

Next steps: Emergency strategy call today or tomorrow to adjust your plan based on these developments.

I'm available until 9pm tonight or can meet early tomorrow morning.

This situation requires immediate attention - please call or reply as soon as you see this.

[Your Name]
[Direct Phone]
[Emergency Contact if needed]`,
            purpose: "Demonstrate proactive protection, position as crisis manager",
            useWhen: "Major market disruptions occur that affect client interests"
        }
    ];

    // Manual email sequence data (existing)
    const emailSequences = [
        {
            id: "day1",
            name: "Day 1",
            subject: "Thanks for your interest in [Property/Area Name]!",
            body: `Hi [First Name],

Thanks so much for reaching out about [specific property/area they inquired about]! I got your message and I'm excited to help you with your home search.

I specialize in the [Area/Neighborhood] market and have been helping buyers find their perfect home for [X years]. Based on your inquiry, I think I can definitely help you find exactly what you're looking for.

I'd love to learn more about your specific needs and timeline. Are you available for a quick 15-minute call tomorrow? I have openings at:
• [Time Option 1]
• [Time Option 2]
• [Time Option 3]

In the meantime, I'm already keeping an eye out for properties that might be perfect for you.

Looking forward to connecting!

[Your Name]
[Your Phone Number]
[Your Email]
[Your License #]`
        },
        {
            id: "day2",
            name: "Day 2",
            subject: "Quick follow-up + [Area] market insights for you",
            body: `Hey [First Name],

I know how busy life gets, so I wanted to follow up on my email yesterday about your home search in [Area].

I've been doing some research on the [Area] market since we last connected, and here's what I'm seeing right now:

📊 Current Market Snapshot:
• Average days on market: [X] days
• Price range for [property type]: $[Low] - $[High]
• Inventory level: [Low/Medium/High]

The good news is [positive market insight specific to their search]. However, [gentle urgency about market conditions].

I'd still love to chat about your specific needs and show you some properties that aren't even on the public market yet. Would a quick call this week work for you?

Just reply with a good time, or feel free to call me directly at [phone number].

Best regards,
[Your Name]`
        },
        {
            id: "day3",
            name: "Day 3",
            subject: "New listings in [Area] - thought you'd want to see these",
            body: `Hi [First Name],

I was reviewing new listings this morning and came across a property that made me think of you immediately.

🏠 [Property Address]
• [Bed]/[Bath] • [Sq Ft] sq ft • $[Price]
• [Key Feature 1]
• [Key Feature 2]
• [Key Feature 3]

What caught my attention: [Specific reason why this property matches their criteria].

Properties like this in [neighborhood] typically get multiple offers within [timeframe]. I can arrange a private showing as early as tomorrow if you're interested.

Even if this particular home isn't quite right, I'd love to understand better what you're looking for so I can send you the best matches. A quick 10-minute conversation could save us both a lot of time.

Interested in learning more about this property or others like it?

[Your Name]
[Phone Number]

P.S. I have access to off-market properties that never hit the public websites. Let's chat!`
        },
        {
            id: "day4",
            name: "Day 4",
            subject: "[First Name], found something you might love",
            body: `Hi [First Name],

I was reviewing new listings this morning and came across a property that made me think of you immediately.

🏠 [Property Address]
• [Bed]/[Bath] • [Sq Ft] sq ft • $[Price]
• [Key Feature 1]
• [Key Feature 2]
• [Key Feature 3]

What caught my attention: [Specific reason why this property matches their criteria].

Properties like this in [neighborhood] typically get multiple offers within [timeframe]. I can arrange a private showing as early as tomorrow if you're interested.

Even if this particular home isn't quite right, I'd love to understand better what you're looking for so I can send you the best matches. A quick 10-minute conversation could save us both a lot of time.

Interested in learning more about this property or others like it?

[Your Name]
[Phone Number]

P.S. I have access to off-market properties that never hit the public websites. Let's chat!`
        },
        {
            id: "day5",
            name: "Day 5",
            subject: "Market update for [Area] - timing might be perfect",
            body: `Hey [First Name],

I wanted to share some interesting market developments in [Area] that might affect your home search.

The market has been showing some interesting trends lately:
• [Recent market trend 1]
• [Recent market trend 2]
• [Recent market trend 3]

This could actually work in your favor because [explanation of how trends benefit buyer].

I have a few properties coming up that might be perfect for your criteria. Would you like me to send you some details, or would you prefer to chat about your timeline first?

I'm here to help make this process as smooth as possible for you.

Best,
[Your Name]
[Phone Number]`
        },
        {
            id: "day6",
            name: "Day 6",
            subject: "Last chance to connect before the weekend",
            body: `Hi [First Name],

I know weekends can be busy, but I wanted to reach out one more time before the weekend starts.

I've been keeping an eye out for properties that match what you're looking for, and I have a few that might be worth your time to see.

Would you be interested in a quick call this afternoon or evening to discuss what I've found? I can also send you some property details if you prefer to review them first.

No pressure either way - I just want to make sure you have all the information you need for your home search.

[Your Name]
[Phone Number]`
        },
        {
            id: "day7",
            name: "Day 7",
            subject: "My commitment to you (last email, I promise)",
            body: `Hi [First Name],

I don't want to keep filling up your inbox, so this will be my last email unless you reach out to me first.

I know you were interested in [area/property type] when you first contacted me, and I want you to know that offer still stands. Whether it's next week, next month, or next year - I'm here when you're ready.

Here's what I promise if we work together:
✓ I'll show you properties before they hit the market
✓ You'll get honest advice, even if it means talking you out of a purchase
✓ I'll negotiate like I'm buying the home for my own family
✓ You'll never feel pressured or rushed

I've helped [X number] families find their perfect home in [area], and I'd love to help you too when the timing is right.

My contact information is below if your situation changes or if you have any real estate questions at all - even if you're just curious about your current home's value.

Wishing you all the best,

[Your Name]
[Phone Number]
[Email]
📧 [Your Website]

P.S. I also help people sell their homes. If you know anyone considering a move, I'd be grateful for the introduction.`
        }
    ];

    // Automated sequences data extracted from automated_sequences.html
    const automatedSequences = [
        {
            id: "hot-buyer-nurture",
            name: "🔥 Hot Buyer Nurture Sequence",
            description: "Pre-approved buyers actively looking to purchase within 90 days",
            duration: "21 days",
            emailCount: 7,
            priority: "High",
            targetAudience: "Ready Buyer Status",
            emails: [
                {
                    id: "hot-day1",
                    day: 1,
                    subject: "Welcome to your VIP buyer experience!",
                    body: `Hi [First Name],

Excited to work with you! Since you're pre-approved and ready to move, I'm setting you up with VIP access to listings before they hit the public market.

Here's what happens next:
• I'll send you off-market opportunities first
• You'll get same-day notifications for new listings
• Priority scheduling for showings

Quick question: What's your ideal move-in timeline?`,
                    purpose: "Set VIP expectations, confirm timeline, establish premium service level"
                },
                {
                    id: "hot-day3",
                    day: 3,
                    subject: "3 homes that just became available",
                    body: `Hey [First Name],

Three properties just hit my radar that match your criteria:

🏠 [Address] - $[Price] - [Key Features]
🏠 [Address] - $[Price] - [Key Features]
🏠 [Address] - $[Price] - [Key Features]

I can show you all three tomorrow if you're available. The market's moving fast - two similar properties went under contract this week within 24 hours of listing.

Which ones interest you most?`,
                    purpose: "Provide immediate value with listings, create urgency, schedule showings"
                },
                {
                    id: "hot-day7",
                    day: 7,
                    subject: "How the best buyers win in this market",
                    body: `Hi [First Name],

After showing you properties this week, I want to share the strategies my most successful buyers use:

✅ Move fast: Good properties get multiple offers within 48 hours
✅ Be flexible: Closing dates and small requests can make or break deals
✅ Know your max: Decide your absolute ceiling before you fall in love

The buyer who got [recent success story] followed exactly this approach.

Ready to talk strategy for your next offer?`,
                    purpose: "Educate on winning strategies, reference social proof, prepare for offers"
                },
                {
                    id: "hot-day10",
                    day: 10,
                    subject: "Market alert: Inventory dropping fast",
                    body: `[First Name], wanted to give you a heads up on what's happening:

Inventory in your price range has dropped 23% this month. Here's what this means for you:

📉 Fewer choices - but the good ones are still out there
📈 More competition - buyers are getting more aggressive
⏰ Faster decisions needed - hesitation costs opportunities

I'm not trying to pressure you, just want you to have the full picture.

How are you feeling about the properties we've seen?`,
                    purpose: "Create urgency with market data, check in on decision-making process"
                },
                {
                    id: "hot-day14",
                    day: 14,
                    subject: "Found something special - need to see today",
                    body: `Hi [First Name],

A property just came on the market that checks every box you mentioned:

🏠 [Address]
💰 $[Price] (priced $15K below recent comps)
⭐ [List of features matching their criteria]

The listing agent mentioned the seller wants offers by Friday. I can show it to you today at 4pm or 6pm.

Even if this isn't "the one," it would be a great comparison for what's possible in your budget.

Available to see it?`,
                    purpose: "Present perfect-match property, create time urgency, schedule immediate showing"
                },
                {
                    id: "hot-day17",
                    day: 17,
                    subject: "Your thoughts on the showing yesterday?",
                    body: `Hey [First Name],

I've been thinking about our conversation after the showing yesterday. You seemed really interested in the layout and location.

Here's my honest take: This property has the best combination of value and features I've seen in your range this month.

A few things to consider:
• Similar homes in the area sold for $[X] more
• The updates are exactly what today's buyers want
• Location and lot size are hard to replicate

What questions can I answer to help you make a decision?`,
                    purpose: "Follow up on showing, provide expert opinion, address hesitations"
                },
                {
                    id: "hot-day21",
                    day: 21,
                    subject: "Checking in - how can I help you get to 'yes'?",
                    body: `Hi [First Name],

We've looked at some great properties over the past few weeks, and I want to make sure I'm giving you exactly what you need.

Quick question: What would need to be different about the next property we see for you to feel confident making an offer?

Is it:
• Price range?
• Location/neighborhood?
• Specific features?
• Timing concerns?

I'd rather adjust my search than keep showing you properties that aren't quite right.

15-minute call this week to recalibrate?`,
                    purpose: "Re-qualify needs, identify obstacles, refine search criteria"
                }
            ]
        },
        {
            id: "seller-conversion",
            name: "🏡 Seller Conversion Sequence",
            description: "Homeowners who requested a valuation or expressed interest in selling",
            duration: "28 days",
            emailCount: 6,
            priority: "Medium",
            targetAudience: "Considering Seller Status",
            emails: [
                {
                    id: "seller-day1",
                    day: 1,
                    subject: "Your home valuation + what happens next",
                    body: `Hi [First Name],

Thanks for requesting a valuation on [Address]! Based on my analysis of recent sales, your home is worth approximately $[Value Range].

Here's how I arrived at that number:
• [Recent comp 1]: $[Price] - [Days on market]
• [Recent comp 2]: $[Price] - [Days on market]
• [Recent comp 3]: $[Price] - [Days on market]

This is a preliminary estimate. For a precise valuation, I'd need to see your specific upgrades and condition.

Interested in a detailed, in-person assessment?`,
                    purpose: "Deliver promised value, show methodology, transition to consultation"
                },
                {
                    id: "seller-day5",
                    day: 5,
                    subject: "What's driving home values in your neighborhood",
                    body: `Hey [First Name],

I've been tracking the [Neighborhood] market closely, and there are some interesting trends affecting home values:

📈 What's helping values:
• [Positive trend 1]
• [Positive trend 2]
• [Positive trend 3]

📊 Recent market activity:
• Average days on market: [X] days
• Homes selling above/below asking: [X]%
• Current inventory: [X] months

Bottom line: This is a [strong/moderate/challenging] market for sellers right now.

Curious how these trends specifically affect your property?`,
                    purpose: "Demonstrate market expertise, provide neighborhood-specific insights"
                },
                {
                    id: "seller-day10",
                    day: 10,
                    subject: "The #1 mistake sellers make (and how to avoid it)",
                    body: `Hi [First Name],

I just finished a listing consultation where the homeowner said something I hear too often:

"We'll just list it high and see what happens. We can always lower the price."

Here's why that's a costly mistake:

🔍 First impressions matter: Most buyers see your home in the first 2 weeks
📉 Price reductions look desperate: Buyers wonder "what's wrong with it?"
💰 You lose money: I've seen this cost sellers $15K-$30K

The better strategy: Price strategically from day one to create buyer competition.

Want to see how this approach worked for my recent sellers?`,
                    purpose: "Educate on pricing strategy, build credibility, overcome common objections"
                },
                {
                    id: "seller-day15",
                    day: 15,
                    subject: "Your neighbor just listed for $XXX,XXX",
                    body: `Hey [First Name],

Thought you'd want to know - [Nearby Address] just hit the market for $[Price].

How it compares to your home:
• Square footage: [Comparison]
• Lot size: [Comparison]
• Updates/condition: [Assessment]
• Location within neighborhood: [Comparison]

My take: They're priced [appropriately/high/low] based on condition and location.

This creates an interesting opportunity for you because [specific opportunity/concern based on their pricing].

Want to discuss how this affects your potential listing strategy?`,
                    purpose: "Use competition to create urgency, position for consultation"
                },
                {
                    id: "seller-day21",
                    day: 21,
                    subject: "Simple improvements that add $10K+ in value",
                    body: `Hi [First Name],

Been thinking about your home and what could maximize its sale price. Here are some improvements I consistently see add serious value:

🎨 Fresh paint (interior): $5K investment = $8K-$12K return
🌿 Landscaping/curb appeal: $2K investment = $8K-$15K return
✨ Deep clean/staging: $1K investment = $5K-$10K return

The math: $8K total investment could add $20K+ to your sale price.

Not every home needs all of this, but I'd love to walk through yours and give you specific recommendations.

30-minute consultation this week to talk strategy?`,
                    purpose: "Show ROI potential, offer specific value, request consultation"
                },
                {
                    id: "seller-day28",
                    day: 28,
                    subject: "Ready to explore your options?",
                    body: `Hey [First Name],

Over the past few weeks, I've shared insights about your neighborhood market and strategies for maximizing your home's value.

Here's what we know:
• Your home is worth approximately $[Value Range]
• The current market conditions are [favorable/challenging] for sellers
• Strategic improvements could add $[Amount] to your sale price

The question is: Are you ready to explore what selling could look like for you?

No pressure at all - I'm happy to answer questions whether you sell next month or next year.

Coffee this week to talk through your situation?`,
                    purpose: "Summarize value provided, soft close for listing consultation"
                }
            ]
        },
        {
            id: "long-term-nurture",
            name: "🌱 Long-Term Nurture Sequence",
            description: "Leads who are 6+ months away from buying/selling but want to stay informed",
            duration: "180 days",
            emailCount: 5,
            priority: "Low",
            targetAudience: "Future Buyer Status",
            emails: [
                {
                    id: "nurture-day1",
                    day: 1,
                    subject: "No rush - let's stay in touch",
                    body: `Hi [First Name],

I totally understand that your timeline for [buying/selling] is still pretty flexible. No pressure at all!

Since you expressed interest in staying informed about the market, I'll send you occasional updates on what's happening in [Area] - nothing pushy, just useful information.

What you can expect:
• Quarterly market reports for your area
• Notable sales or listings you might find interesting
• Changes in financing or market conditions

And of course, if your timeline changes or you have questions, I'm always here to help.

Sound good?`,
                    purpose: "Set expectations for low-pressure nurture, confirm interest in staying informed"
                },
                {
                    id: "nurture-day45",
                    day: 45,
                    subject: "Q1 market report for [Area]",
                    body: `Hey [First Name],

Here's what happened in the [Area] market this quarter:

📊 Key Numbers:
• Median sale price: $[Amount] ([up/down X% from last quarter])
• Average days on market: [X] days
• Number of sales: [X] ([up/down from last quarter])

🏠 Notable Sales:
[Address] sold for $[Amount] - [interesting detail]
[Address] sold for $[Amount] - [interesting detail]

💡 What this means: [Brief, plain-English interpretation]

Any questions about how these trends might affect your future plans?`,
                    purpose: "Provide valuable market intelligence, demonstrate ongoing expertise"
                },
                {
                    id: "nurture-day90",
                    day: 90,
                    subject: "Interesting development in [Neighborhood]",
                    body: `Hi [First Name],

Saw something in [Area] that I thought you'd find interesting given your interest in the neighborhood.

[Description of development - could be new construction, commercial development, infrastructure improvement, school news, etc.]

Why this matters: [Explanation of how this could impact property values, desirability, etc.]

Timeline: [When this development will be completed/take effect]

This kind of thing doesn't happen often, so I wanted to make sure you knew about it as you think about your future plans.

Hope you're doing well!`,
                    purpose: "Share relevant local intelligence, maintain relationship"
                },
                {
                    id: "nurture-day135",
                    day: 135,
                    subject: "Has anything changed with your timeline?",
                    body: `Hey [First Name],

Hope you're having a great [season]! I know when we first talked, you mentioned your timeline for [buying/selling] was pretty flexible.

Just wanted to check in and see if anything has changed in your world that might affect your plans:

• Job or family situation changes?
• Different thoughts on timing?
• New questions about the market?

No worries if everything's still the same - just want to make sure I'm giving you the right kind of information.

The market has shifted a bit since we last talked, so happy to give you an update if you're curious.

How are things going?`,
                    purpose: "Re-qualify timeline and needs, check for life changes"
                },
                {
                    id: "nurture-day180",
                    day: 180,
                    subject: "6-month market recap + what's ahead",
                    body: `Hi [First Name],

It's been about 6 months since we first connected, so I thought I'd give you a recap of what's happened in the [Area] market:

📈 Biggest changes:
• [Major market trend 1]
• [Major market trend 2]
• [Major market trend 3]

🔮 What I'm watching for the next 6 months:
• [Prediction/trend to watch 1]
• [Prediction/trend to watch 2]

For you: If your timeline is still flexible, [specific advice based on market conditions].

Still happy to be your market resource whenever you're ready to make a move!`,
                    purpose: "Provide comprehensive market summary, demonstrate long-term value"
                }
            ]
        },
        // PRO PLAN AUTOMATED SEQUENCES
        {
            id: "luxury-buyer-cultivation",
            name: "💎 Luxury Buyer Cultivation Sequence",
            description: "High-net-worth individuals seeking luxury properties $1M+",
            duration: "60 days",
            emailCount: 9,
            priority: "Ultra-High",
            targetAudience: "Luxury Buyer Status",
            emails: [
                {
                    id: "luxury-day1",
                    day: 1,
                    subject: "Welcome to our exclusive buyer's circle",
                    body: `Dear [First Name],

Thank you for your interest in luxury properties in [Area]. You're now part of an exclusive circle of discerning buyers who receive private access to exceptional estates.

What this means for you:
• First access to off-market properties before public listing
• Private showings arranged at your convenience
• Comprehensive market intelligence and investment analysis
• White-glove concierge service throughout your search

Your dedicated team includes:
• [Your Name] - Executive Agent and Market Strategist
• [Assistant Name] - Personal Showing Coordinator
• [Partner Name] - Luxury Market Specialist

I'll be personally overseeing your property search and ensuring you have access to the most exceptional opportunities in the market.

Next step: I'd like to schedule a private consultation to understand your vision and preferences in detail.

Best regards,
[Your Full Name]
[Luxury Designations]`,
                    purpose: "Establish exclusivity and premium service level, build luxury market positioning"
                },
                {
                    id: "luxury-day4",
                    day: 4,
                    subject: "Confidential: Three exceptional properties available",
                    body: `[First Name],

I have three extraordinary properties that became available this week through my private network. Each offers something unique for the sophisticated buyer.

Property Alpha: [Location] Estate
• $[Price] | [Square footage] | [Lot size]
• [Unique luxury feature 1]
• [Unique luxury feature 2]
• Investment potential: [Specific analysis]

Property Beta: [Location] Residence
• $[Price] | [Square footage] | [Lot size]
• [Unique luxury feature 1]
• [Unique luxury feature 2]
• Lifestyle benefit: [Specific advantage]

Property Gamma: [Location] Compound
• $[Price] | [Square footage] | [Lot size]
• [Unique luxury feature 1]
• [Unique luxury feature 2]
• Rare attribute: [What makes it special]

Confidentiality note: These properties are being marketed discretely. I can arrange private viewings with 48-hour notice.

Which properties align with your vision?

[Your Name]`,
                    purpose: "Provide exclusive inventory, demonstrate market access, create viewing urgency"
                },
                {
                    id: "luxury-day8",
                    day: 8,
                    subject: "Market intelligence: Luxury trends impacting your search",
                    body: `Dear [First Name],

I wanted to share some intelligence from this quarter's luxury market analysis that could impact your property search strategy.

Key Market Dynamics:

📈 Ultra-luxury segment ($2M+): [Trend analysis]
🏛️ Historic properties: [Appreciation/demand data]
🏢 New construction luxury: [Market positioning]
🌊 Waterfront estates: [Scarcity/value analysis]

Investment opportunity: Properties in [specific luxury sub-market] are showing [X]% annual appreciation, outperforming the broader luxury market.

Timing considerations: [Seasonal/economic factors affecting luxury market]

For your search specifically: Based on your preferences for [their stated criteria], this market intelligence suggests [strategic recommendation].

I've prepared a detailed market report if you'd like to review the complete analysis.

Best regards,
[Your Name]`,
                    purpose: "Demonstrate market expertise, provide investment-grade analysis, build advisor relationship"
                },
                {
                    id: "luxury-day12",
                    day: 12,
                    subject: "Private showing recap and next steps",
                    body: `[First Name],

Thank you for taking the time to view [Property Address] with me yesterday. I enjoyed our conversation about [specific detail from showing].

Follow-up items from our discussion:
• [Specific information they requested]
• [Research item or clarification needed]
• [Additional property detail or document]

My professional assessment: This property offers [specific benefits aligned with their goals] and represents [investment/lifestyle value proposition].

Comparable analysis: Recent sales of similar properties:
• [Address]: $[Price] - [Key differentiator]
• [Address]: $[Price] - [Key differentiator]
• Current listing: Positioned [competitively/premium] in comparison

If you're interested in moving forward: I recommend [specific action - offer strategy, additional inspections, etc.]

Alternative options: I have two similar properties that might also interest you based on our conversation yesterday.

What are your thoughts on our next steps?

[Your Name]`,
                    purpose: "Provide detailed follow-up, comparative analysis, guide decision-making process"
                },
                {
                    id: "luxury-day18",
                    day: 18,
                    subject: "Exclusive opportunity: Estate coming to market next week",
                    body: `Dear [First Name],

I received confidential information about an extraordinary estate that will come to market next week. Given your interest in [specific criteria], I believe this could be exactly what you're seeking.

The Property: [Location] Historic Estate
• Originally built: [Year] by [Notable architect/owner if applicable]
• Completely renovated: [Recent year]
• Size: [Square footage] on [Lot size]
• Expected listing price: $[Range]

What makes it exceptional:
• [Unique architectural or historical feature]
• [Luxury amenity that matches their preferences]
• [Location advantage or view]
• [Investment or lifestyle benefit]

The opportunity: The listing agent is allowing me to show it to select buyers before the public launch. This gives you a significant advantage in a competitive luxury market.

Viewing availability: Tuesday 2-4pm or Wednesday 10am-12pm (before marketing begins)

Based on current luxury market activity, I expect this property to generate significant interest once public.

Shall I arrange a private preview?

[Your Name]`,
                    purpose: "Present exceptional opportunity, create time urgency, leverage exclusive access"
                },
                {
                    id: "luxury-day25",
                    day: 25,
                    subject: "Investment strategy: Diversifying through luxury real estate",
                    body: `[First Name],

During our recent conversations, you mentioned your interest in the investment potential of luxury real estate. I've prepared some analysis that might interest you.

Luxury Real Estate as Investment Vehicle:

📊 Historical Performance:
• [Local luxury market] has appreciated [X]% annually over past 5 years
• Significantly outperformed [comparison metric - stock market, bonds, etc.]
• Lower volatility than traditional equity investments

💰 Tax Advantages:
• Depreciation benefits for income-producing properties
• 1031 exchange opportunities for portfolio growth
• Estate planning advantages for high-net-worth individuals

🏠 Portfolio Diversification:
• Tangible asset with intrinsic value
• Hedge against inflation and currency devaluation
• Potential for both appreciation and income generation

Current opportunities: I've identified [X] properties that could serve dual purposes - exceptional residences and strong investment vehicles.

Next step: If this investment strategy interests you, I can arrange consultations with our preferred wealth advisors and tax specialists.

Would you like to explore this approach further?

Best regards,
[Your Name]`,
                    purpose: "Position real estate as investment strategy, demonstrate financial sophistication"
                },
                {
                    id: "luxury-day35",
                    day: 35,
                    subject: "Concierge update: Your luxury lifestyle transition",
                    body: `Dear [First Name],

As we continue your property search, I want to ensure you're aware of all the concierge services available to make your transition seamless.

Pre-Purchase Services:
• Private jet coordination for property tours
• Luxury hotel arrangements during visit weekends
• Introduction to exclusive club memberships and social networks
• Connection with private banking and wealth management services

Post-Purchase Support:
• Interior design team recommendations (luxury specialists)
• Property management and estate services
• Security system design and installation
• Landscaping and grounds maintenance coordination

Lifestyle Integration:
• Private chef and household staff placement
• Children's private school enrollment assistance
• Healthcare concierge services
• Cultural and social event access

Recent client example: I recently assisted [Client initial] with their $[X]M purchase, coordinating everything from the initial viewing to move-in day, including [specific high-end service provided].

These services ensure your property acquisition is just the beginning of a seamless luxury lifestyle transition.

Which of these services would be most valuable for your situation?

[Your Name]`,
                    purpose: "Demonstrate comprehensive luxury service offering, differentiate from competition"
                },
                {
                    id: "luxury-day45",
                    day: 45,
                    subject: "Market shift alert: Opportunity for sophisticated buyers",
                    body: `[First Name],

I'm observing a subtle but significant shift in the luxury market that creates an interesting opportunity for buyers with your sophistication and flexibility.

What's changing:
• [Market trend 1 - inventory, pricing, etc.]
• [Market trend 2 - buyer behavior, seller motivation, etc.]
• [Market trend 3 - economic factors, policy changes, etc.]

The opportunity: This combination of factors means exceptional properties are staying on the market slightly longer, giving qualified buyers more negotiating leverage.

Strategic timing: The next 60-90 days could present the best buying conditions we've seen in [X] years for luxury properties.

Properties positioned for opportunity:
• [Address]: Now priced at $[Amount] (originally $[Higher amount])
• [Address]: Seller highly motivated due to [reason]
• [Address]: Exceptional value at current asking price

My recommendation: If any properties have captured your interest, this could be an optimal time to make strategic offers.

I can prepare detailed offer strategies that capitalize on current market conditions.

Shall we discuss your approach to this market opportunity?

[Your Name]`,
                    purpose: "Create urgency through market timing, position for offer-making"
                },
                {
                    id: "luxury-day60",
                    day: 60,
                    subject: "Quarterly review: Refining your property search",
                    body: `Dear [First Name],

As we complete two months of working together, I wanted to take a moment to review our progress and refine our strategy moving forward.

Properties Viewed: [X] exclusive properties
Market Areas Explored: [List of neighborhoods/areas]
Price Range Refined: $[Range] based on your feedback

Key insights from our journey:
• You responded most positively to properties with [specific features]
• [Location type] seems to align best with your lifestyle goals
• [Architectural style/era] appears to be your preference
• Investment potential is [high/moderate/low] priority for you

Refined search criteria:
Based on your feedback, I'm now focusing on properties that offer:
1. [Updated criterion 1]
2. [Updated criterion 2]
3. [Updated criterion 3]

Market outlook for your refined search: [Specific analysis based on their preferences]

Upcoming opportunities: I'm tracking [X] properties that should become available in the next 30 days that align with your refined preferences.

Is there anything you'd like to adjust about our search strategy or service approach?

Best regards,
[Your Name]`,
                    purpose: "Demonstrate attentiveness, refine search criteria, show progress and value"
                }
            ]
        },
        {
            id: "investment-property-mastery",
            name: "📈 Investment Property Mastery Sequence",
            description: "Sophisticated investors seeking income-producing or appreciation properties",
            duration: "45 days",
            emailCount: 8,
            priority: "High",
            targetAudience: "Investment Buyer Status",
            emails: [
                {
                    id: "investment-day1",
                    day: 1,
                    subject: "Your real estate investment strategy blueprint",
                    body: `[First Name],

Welcome to our exclusive real estate investment program. As someone with experience in [their known investment area], you understand the power of strategic asset allocation.

Why real estate for your portfolio?
• Historical returns: [X]% annually in our market
• Tax advantages: Depreciation, 1031 exchanges, tax-deferred growth
• Inflation hedge: Property values and rents typically rise with inflation
• Control: Unlike stocks, you can directly influence property performance

Investment strategies we'll explore:
1. Cash flow properties: Immediate income generation
2. Value-add opportunities: Force appreciation through improvements
3. Appreciation plays: Long-term wealth building in growth markets
4. Portfolio diversification: Geographic and property type spreading

Your investment profile analysis: Based on our conversation, you appear suited for [specific strategy] given your [timeline/risk tolerance/capital availability].

Next step: I've prepared 3 current opportunities that align with your criteria. Each offers different risk/return profiles.

Ready to review your first investment opportunities?

[Your Name]
[Investment Credentials]`,
                    purpose: "Establish investment credibility, educate on strategies, set expectations"
                },
                {
                    id: "investment-day5",
                    day: 5,
                    subject: "Investment opportunity analysis: 3 properties, 3 strategies",
                    body: `[First Name],

I've identified three investment opportunities that demonstrate different wealth-building strategies. Each offers unique advantages for sophisticated investors.

OPPORTUNITY 1: Cash Flow Champion
📍 [Address] - Multi-family property
💰 Purchase price: $[Amount]
💵 Monthly cash flow: $[Amount] after all expenses
📊 Cap rate: [X]% | Cash-on-cash return: [X]%
🎯 Strategy: Immediate income with stable tenants

OPPORTUNITY 2: Value-Add Potential
📍 [Address] - Single-family renovation project
💰 Purchase price: $[Amount] | Renovation budget: $[Amount]
📈 ARV (After Repair Value): $[Amount]
📊 Projected ROI: [X]% over [timeframe]
🎯 Strategy: Force appreciation through strategic improvements

OPPORTUNITY 3: Appreciation Play
📍 [Address] - Growth area development
💰 Purchase price: $[Amount]
📊 5-year appreciation projection: [X]% based on area development
🏗️ Catalysts: [Specific developments driving growth]
🎯 Strategy: Long-term wealth building in emerging market

My recommendation: Based on your [risk tolerance/timeline/capital], I suggest starting with [specific opportunity and reasoning].

Due diligence package: I can provide detailed financial analysis, comparable sales, and market projections for any property that interests you.

Which opportunity aligns best with your investment thesis?

[Your Name]`,
                    purpose: "Present concrete opportunities, demonstrate different strategies, prompt engagement"
                },
                {
                    id: "investment-day10",
                    day: 10,
                    subject: "Market intelligence: Emerging investment trends 2025",
                    body: `Dear [First Name],

I wanted to share some forward-looking market intelligence that could impact your investment strategy over the next 12-18 months.

Trend 1: Short-term rental market evolution
• Regulation changes in [City]: [Impact analysis]
• Emerging profitable markets: [Specific areas]
• ROI comparison: STR vs. traditional rental in our market

Trend 2: Build-to-rent communities
• Institutional investor activity increasing
• Opportunity for individual investors in [specific market segment]
• Entry strategies for sophisticated investors

Trend 3: Climate-conscious investing
• Properties with energy efficiency commanding premium rents
• Federal and state incentives for green improvements
• Long-term value protection against climate risks

Interest rate environment impact:
• Current rates: [X]% for investment properties
• Projected direction: [Analysis based on Fed policy]
• Timing strategy: [Recommendations for current environment]

Opportunity timing: Based on these trends, I believe the next 6 months present optimal conditions for [specific investment strategy].

Action items for your portfolio:
1. [Specific recommendation 1]
2. [Specific recommendation 2]
3. [Specific recommendation 3]

Would you like to discuss how these trends affect your investment timeline?

[Your Name]`,
                    purpose: "Demonstrate market expertise, provide forward-looking intelligence, create urgency"
                },
                {
                    id: "investment-day18",
                    day: 18,
                    subject: "Tax strategy: Maximizing your real estate investment returns",
                    body: `[First Name],

Given your high-income bracket, I wanted to discuss how real estate investments can significantly reduce your tax burden while building wealth.

Key Tax Advantages:

💰 Depreciation Benefits:
• Residential properties: 27.5-year depreciation schedule
• Commercial properties: 39-year schedule
• Potential annual deduction: $[Amount] on typical investment

🔄 1031 Exchange Strategy:
• Defer capital gains taxes indefinitely
• Portfolio growth without tax drag
• Example: $[Amount] property can become $[Higher amount] without tax consequences

📊 Passive Loss Utilization:
• Offset other passive income
• Real estate professional status advantages
• Strategic timing of gains and losses

Case study: Recent client with similar income profile:
• Investment: $[Amount] in rental property
• Annual tax savings: $[Amount] through depreciation
• 5-year wealth impact: $[Amount] in tax savings + appreciation

Year-end tax planning opportunity: We have [X] days left in the tax year to implement strategies that could save you $[Amount] in 2025 taxes.

Next step: I work closely with [Tax professional name], a specialist in real estate tax strategy. Would you like me to arrange a three-way consultation to explore your specific opportunities?

[Your Name]`,
                    purpose: "Demonstrate tax sophistication, create urgency for tax planning, introduce professional network"
                },
                {
                    id: "investment-day25",
                    day: 25,
                    subject: "Portfolio diversification: Geographic and property type analysis",
                    body: `Dear [First Name],

As we discuss building your real estate investment portfolio, I wanted to share some analysis on diversification strategies that reduce risk while maximizing returns.

Geographic Diversification Analysis:

🏙️ Primary Market ([Your City]):
• Advantages: Local knowledge, easier management, strong fundamentals
• Considerations: Market concentration risk
• Recommended allocation: 60-70% of portfolio

🌆 Secondary Markets:
• [City 1]: [Growth drivers and investment case]
• [City 2]: [Growth drivers and investment case]
• Recommended allocation: 20-30% of portfolio

Property Type Diversification:

🏠 Single-family rentals: Stable, easy to understand, good for beginners
🏢 Small multifamily (2-4 units): Better cash flow, economies of scale
🏬 Commercial properties: Higher returns, longer leases, professional tenants
🏨 Short-term rentals: Higher income potential, more management intensive

Your optimal portfolio allocation:
Based on your [capital/experience/risk tolerance], I recommend:
• [X]% in [property type] for [reason]
• [X]% in [property type] for [reason]
• [X]% in [property type] for [reason]

Current market opportunities: I've identified properties in each category that could serve as portfolio anchors.

Would you like to review properties that could serve as your foundation investments?

[Your Name]`,
                    purpose: "Educate on portfolio strategy, position for multiple property purchases"
                },
                {
                    id: "investment-day32",
                    day: 32,
                    subject: "Due diligence checklist: Protecting your investment",
                    body: `[First Name],

As you evaluate investment properties, I wanted to share my comprehensive due diligence process that has protected my clients from costly mistakes.

Financial Due Diligence:
✅ Rent roll analysis (current rents vs. market rates)
✅ Operating expense verification (3-year history)
✅ Capital expenditure needs assessment
✅ Cash flow projections (conservative assumptions)
✅ Comparable sales analysis
✅ Financing options and terms comparison

Physical Due Diligence:
✅ Professional property inspection
✅ Environmental assessments (if applicable)
✅ Title and survey review
✅ Zoning and legal compliance verification
✅ Insurance requirement and cost analysis

Market Due Diligence:
✅ Neighborhood trend analysis
✅ Future development impact assessment
✅ Local economic and employment trends
✅ School district quality and trends
✅ Crime statistics and trends

Management Due Diligence:
✅ Current property management evaluation
✅ Tenant quality and lease term analysis
✅ Maintenance history and current needs
✅ Local property management options and costs

Red flags that have saved clients money:
• [Example 1 of issue discovered and cost avoided]
• [Example 2 of issue discovered and cost avoided]
• [Example 3 of issue discovered and cost avoided]

Your due diligence team: I work with trusted professionals including inspectors, appraisers, attorneys, and accountants who specialize in investment properties.

Ready to put this process to work on a specific property?

[Your Name]`,
                    purpose: "Demonstrate thoroughness, build confidence, introduce professional team"
                },
                {
                    id: "investment-day38",
                    day: 38,
                    subject: "Success story: How [Client] built $2M in equity in 3 years",
                    body: `Dear [First Name],

I wanted to share a recent success story that demonstrates the wealth-building power of strategic real estate investing.

Client Background: [Client initial], similar situation to yours - high-income professional seeking portfolio diversification.

Starting Point (2022):
• Available capital: $500K
• Goal: Generate passive income and build long-term wealth
• Risk tolerance: Moderate

Strategy Implemented:
• Year 1: Acquired 2 single-family rentals ($300K each)
• Year 2: Added small multifamily property ($450K)
• Year 3: Value-add duplex renovation project ($280K)

Results After 3 Years:
• Total portfolio value: $1.8M
• Total equity: $650K (started with $200K down payments)
• Monthly cash flow: $3,200 after all expenses
• Annual tax savings: $15,000 through depreciation

Key Success Factors:
1. Started with conservative, cash-flowing properties
2. Reinvested cash flow into next property down payments
3. Used 1031 exchanges to defer taxes and upgrade
4. Focused on emerging neighborhoods with development catalysts

Current Status: [Client] is now acquiring property #5 and has achieved financial independence through real estate cash flow.

Lessons for your strategy: [Specific applications to their situation]

Timeline for you: Based on your situation, I believe you could achieve similar results in [timeframe] using [specific strategy].

Ready to begin building your real estate wealth portfolio?

[Your Name]`,
                    purpose: "Provide social proof, demonstrate results, create investment timeline vision"
                },
                {
                    id: "investment-day45",
                    day: 45,
                    subject: "Investment portfolio roadmap: Your 5-year wealth plan",
                    body: `[First Name],

Based on our conversations over the past 6 weeks, I've created a personalized 5-year investment roadmap that could help you achieve your wealth-building goals.

Your Investment Profile:
• Available capital: $[Amount]
• Annual investment capacity: $[Amount]
• Risk tolerance: [Conservative/Moderate/Aggressive]
• Timeline: [Short/Medium/Long-term focus]

5-Year Roadmap:

Year 1: Foundation Building
• Acquire: [Property type] in [Location]
• Investment: $[Amount]
• Expected cash flow: $[Amount]/month
• Goal: Establish track record and cash flow base

Year 2: Portfolio Expansion
• Acquire: [Property type] in [Location]
• Funding: Cash flow + additional capital
• Portfolio value: $[Amount]
• Goal: Diversification and increased cash flow

Years 3-5: Acceleration Phase
• Strategy: [Specific approach - value-add, geographical expansion, etc.]
• Target portfolio: [X] properties worth $[Amount]
• Projected cash flow: $[Amount]/month
• Net worth impact: $[Amount] in equity

Financial Projections:
• Total investment: $[Amount] over 5 years
• Portfolio value: $[Amount]
• Equity buildup: $[Amount]
• Monthly passive income: $[Amount]
• Tax savings: $[Amount] annually

Risk mitigation strategies:
• [Strategy 1]
• [Strategy 2]
• [Strategy 3]

Next step: I've identified the perfect property to begin your wealth-building journey. It meets all your criteria and could serve as your portfolio foundation.

Ready to review Property #1 and begin building your real estate empire?

[Your Name]
[Investment Specialist Designation]`,
                    purpose: "Present comprehensive investment plan, create long-term vision, prompt immediate action"
                }
            ]
        },
        {
            id: "vip-past-client-nurture",
            name: "👑 VIP Past Client Nurture Sequence",
            description: "High-value past clients who could provide premium referrals",
            duration: "365 days",
            emailCount: 6,
            priority: "High",
            targetAudience: "VIP Past Client Status",
            emails: [
                {
                    id: "vip-day60",
                    day: 60,
                    subject: "How's life in your new home? + exclusive invitation",
                    body: `Dear [First Name],

I hope you and [Family member names] are settling beautifully into [Property Address]. It feels like just yesterday we were walking through those rooms for the first time!

How are things going?
• Have you discovered your favorite room yet?
• Any fun projects or improvements planned?
• How are you enjoying [specific neighborhood feature they mentioned loving]?

Exclusive invitation: I'm hosting an intimate client appreciation dinner at [Upscale restaurant/venue] on [Date] for my most valued clients. It's a chance to connect with other successful professionals who've made strategic real estate moves.

Who you'll meet:
• [Client A] - [Their profession/business], recently purchased $[X]M estate
• [Client B] - [Their profession/business], built impressive investment portfolio
• [Client C] - [Their profession/business], successfully sold and upgraded

Evening details:
📅 Date: [Date and time]
📍 Venue: [Exclusive location]
🍽️ Format: Multi-course dinner with wine pairings
👥 Group size: Limited to 8 couples for intimate conversation

I'd love to have you join us - are you and [Spouse name] available that evening?

P.S. If you need any local recommendations - contractors, services, restaurants - I have a curated list of the best professionals in [City].

Looking forward to hearing from you!

Warmest regards,
[Your Name]`,
                    purpose: "Check satisfaction, create networking opportunities, maintain VIP status"
                },
                {
                    id: "vip-day180",
                    day: 180,
                    subject: "Your home's appreciation update + market intelligence",
                    body: `[First Name],

I was running my quarterly market analysis and had some exciting news to share about your investment at [Address].

Your home's performance:
• Purchase price: $[Original price] ([Purchase date])
• Current estimated value: $[New estimate]
• Appreciation: $[Amount] ([X]% increase)
• Annualized return: [X]% (excellent for residential real estate)

What's driving the appreciation:
• [Local market factor 1]
• [Local market factor 2]
• [Specific neighborhood development or trend]

Market intelligence for your network:
I know you have colleagues and friends who might be interested in real estate moves. Here's what I'm seeing:

• Best buying opportunities: [Specific areas/price points with reasoning]
• Optimal selling conditions: [Property types/locations that should sell now]
• Investment hotspots: [Areas with development catalysts]

Exclusive preview: I have 2 exceptional off-market properties becoming available next month. Both would suit successful professionals in your network:

Property 1: $[Price] in [Desirable area] - [Key selling points]
Property 2: $[Price] in [Prestigious location] - [Key selling points]

If anyone in your circle is considering a move, I'd be honored to provide the same level of service you experienced.

Hope you're continuing to love the new place!

Best regards,
[Your Name]`,
                    purpose: "Demonstrate ongoing value, provide market intelligence, generate referral opportunities"
                },
                {
                    id: "vip-day270",
                    day: 270,
                    subject: "Exclusive market briefing: What's next for your neighborhood",
                    body: `Dear [First Name],

I wanted to share some exclusive market intelligence about your neighborhood that could impact your long-term real estate strategy.

Neighborhood Development Pipeline:
• [Major project 1]: [Impact and timeline]
• [Major project 2]: [Impact and timeline]
• Infrastructure improvements: [Specific upgrades planned]

Market Performance Analysis:
• Your area appreciation: [X]% above city average
• Days on market: [Current trend]
• Price per square foot: [Trend analysis]
• Luxury segment performance: [Specific to their property type]

Investment Implications:
Based on these developments, properties in your area could see [X]% additional appreciation over the next 2-3 years.

Strategic Considerations:
• Hold vs. sell analysis for your specific property
• Timing optimization for any future moves
• Portfolio diversification opportunities

Exclusive Access:
I'm tracking [X] properties in your area that could serve as investment opportunities or upgrades for your network.

Would you like me to prepare a detailed neighborhood analysis report for your property?

Best regards,
[Your Name]`,
                    purpose: "Provide exclusive market intelligence, demonstrate ongoing expertise, maintain relationship"
                },
                {
                    id: "vip-day300",
                    day: 300,
                    subject: "Client appreciation: Exclusive event invitation",
                    body: `Dear [First Name],

I'm hosting an exclusive client appreciation event that I'd love you to attend. It's designed specifically for my most valued clients and their networks.

Event Details:
🎭 Private wine tasting and networking
📍 [Exclusive venue]
📅 [Date and time]
👥 Limited to 20 couples

Special Features:
• Wine expert presentation on investment-grade wines
• Market intelligence briefing (not available to general public)
• Networking with other successful professionals
• Exclusive access to off-market property previews

Guest Speaker: [Notable industry expert] will discuss [relevant topic - market trends, investment strategies, etc.]

Why I'm reaching out: You've been an exceptional client, and I'd love to introduce you to other successful professionals who share your values and interests.

Plus, I know you appreciate fine wine - this will be a truly special evening.

Are you and [Spouse name] available to join us?

Looking forward to seeing you there!

Warmest regards,
[Your Name]`,
                    purpose: "Create exclusive networking opportunity, demonstrate appreciation, maintain VIP relationship"
                },
                {
                    id: "vip-day330",
                    day: 330,
                    subject: "Market opportunity: Strategic timing for your network",
                    body: `[First Name],

I'm seeing some interesting market dynamics that create opportunities for sophisticated buyers and sellers in your network.

Current Market Conditions:
• [Specific market trend 1]
• [Specific market trend 2]
• [Economic factor affecting real estate]

Opportunity Analysis:
• Best time to buy: [Specific timeframe and reasoning]
• Optimal selling window: [Specific timeframe and reasoning]
• Investment opportunities: [Specific property types/locations]

For Your Network:
I know you have colleagues and friends who might be considering real estate moves. This could be an optimal time for them to act.

Exclusive Preview:
I have [X] properties coming to market that would suit successful professionals:
• [Property 1]: [Key details and target buyer profile]
• [Property 2]: [Key details and target buyer profile]

Referral Program:
For any successful referrals, I'm offering [specific benefit - could be market analysis, consultation, etc.].

Would you like me to send you a brief overview of current opportunities that might interest your network?

Best regards,
[Your Name]`,
                    purpose: "Create referral opportunities, demonstrate market expertise, maintain engagement"
                },
                {
                    id: "vip-day365",
                    day: 365,
                    subject: "Anniversary celebration + exclusive market forecast",
                    body: `Dear [First Name],

Happy anniversary! It's been exactly one year since we closed on [Property Address], and I wanted to celebrate this milestone with you.

Your Investment Performance:
• Purchase price: $[Original price]
• Current estimated value: $[Current value]
• Total appreciation: $[Amount] ([X]% return)
• Monthly equity buildup: $[Amount]

Market Forecast for Your Area:
• 12-month appreciation projection: [X]%
• Development catalysts: [Specific projects]
• Risk factors: [Potential concerns]
• Opportunity factors: [Positive trends]

Exclusive Anniversary Offer:
To celebrate your successful investment, I'm offering:
• Complimentary market analysis for any property you're considering
• Priority access to off-market opportunities
• Introduction to my network of luxury service providers

Looking Ahead:
Based on current market trends, your property could appreciate an additional [X]% over the next 12 months.

Thank you for being such an exceptional client. Your success is my success.

Here's to many more years of profitable real estate decisions!

Warmest regards,
[Your Name]`,
                    purpose: "Celebrate milestone, demonstrate ongoing value, strengthen long-term relationship"
                }
            ]
        }
    ];

    const handleTemplateChange = (templateType) => {
        setSelectedTemplate(templateType);
        setSelectedEmailTemplate(""); // Reset email template selection
        setSelectedSequenceDay(""); // Reset sequence day selection
        setSelectedAutomatedSequence(""); // Reset automated sequence selection
        setSelectedAutomatedEmail(""); // Reset automated email selection
        setSelectedRandomTemplate(""); // Reset random template selection

        // Don't auto-populate any templates - let user decide when to apply
    };

    const handleEmailTemplateChange = (templateId) => {
        setSelectedEmailTemplate(templateId);

        if (templateId) {
            const template = emailTemplates.find(t => t.id === templateId);
            if (template) {
                setForm(prev => ({
                    ...prev,
                    subject: template.subject,
                    body: template.body
                }));
            }
        }
    };

    const handleSequenceDayChange = (dayId) => {
        setSelectedSequenceDay(dayId);

        if (dayId) {
            const sequence = emailSequences.find(s => s.id === dayId);
            if (sequence) {
                setForm(prev => ({
                    ...prev,
                    subject: sequence.subject,
                    body: sequence.body
                }));
            }
        }
    };

    const handleAutomatedSequenceChange = (sequenceId) => {
        setSelectedAutomatedSequence(sequenceId);
        setSelectedAutomatedEmail(""); // Reset automated email selection

        if (sequenceId) {
            const sequence = automatedSequences.find(s => s.id === sequenceId);
            if (sequence && sequence.emails && sequence.emails.length > 0) {
                // Auto-select the first email in the sequence
                const firstEmail = sequence.emails[0];
                setForm(prev => ({
                    ...prev,
                    subject: firstEmail.subject,
                    body: firstEmail.body
                }));
                setSelectedAutomatedEmail(firstEmail.id);
            }
        }
    };

    const handleAutomatedEmailChange = (emailId) => {
        setSelectedAutomatedEmail(emailId);

        if (emailId && selectedAutomatedSequence) {
            const sequence = automatedSequences.find(s => s.id === selectedAutomatedSequence);
            if (sequence && sequence.emails) {
                const email = sequence.emails.find(e => e.id === emailId);
                if (email) {
                    setForm(prev => ({
                        ...prev,
                        subject: email.subject,
                        body: email.body
                    }));
                }
            }
        }
    };

    const handleRandomTemplateChange = (templateId) => {
        setSelectedRandomTemplate(templateId);

        if (templateId) {
            const template = manualEmailTemplates.find(t => t.id === templateId);
            if (template) {
                setForm(prev => ({
                    ...prev,
                    subject: template.subject,
                    body: template.body
                }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        try {
            let result;
            if (replyTo) {
                result = await onSendEmail({
                    emailId: replyTo.id,
                    replyData: {
                        to: form.to,
                        subject: form.subject,
                        body: form.body,
                        attachments: form.attachments,
                    }
                });
            } else {
                result = await onSendEmail({
                    to: form.to,
                    subject: form.subject,
                    body: form.body,
                    attachments: form.attachments,
                });
            }

            // Only close modal if email was sent successfully
            if (result && result.success) {
                // Clear template selections and form when closing
                setSelectedTemplate("");
                setSelectedEmailTemplate("");
                setSelectedSequenceDay("");
                setSelectedAutomatedSequence("");
                setSelectedAutomatedEmail("");
                setSelectedRandomTemplate("");
                setForm({
                    to: "",
                    subject: "",
                    body: "",
                    attachments: [],
                });
                onClose(true);
            }
        } catch (error) {
            console.error("Failed to send email:", error);
            // Don't close modal on error
        } finally {
            setIsSending(false);
        }
    };

    const handleClose = () => {
        // Clear template selections when closing
        setSelectedTemplate("");
        setSelectedEmailTemplate("");
        setSelectedSequenceDay("");
        setSelectedAutomatedSequence("");
        setSelectedAutomatedEmail("");
        setSelectedRandomTemplate("");
        // Clear form fields
        setForm({
            to: "",
            subject: "",
            body: "",
            attachments: [],
        });
        onClose(false);
    };

    if (!open) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] rounded-lg max-w-4xl w-full max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 border-b border-[var(--primary-color)]/30 flex-shrink-0">
                    <h2 className="text-xl font-semibold text-gray-200">
                        {replyTo ? "Reply to Email" : "Compose Email"}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <div className="p-4 border-b border-[var(--primary-color)]/30">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        To
                                    </label>
                                    <input
                                        type="email"
                                        value={form.to}
                                        onChange={(e) => setForm(prev => ({ ...prev, to: e.target.value }))}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        placeholder="Enter recipient email"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={form.subject}
                                        onChange={(e) => setForm(prev => ({ ...prev, subject: e.target.value }))}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        placeholder="Enter email subject"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Email Templates
                                    </label>
                                    <select
                                        value={selectedTemplate}
                                        onChange={(e) => handleTemplateChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                    >
                                        <option value="">Select Email Template</option>
                                        <option value="random">Random Templates (Starter Items)</option>
                                        <option value="manual">Manual Sequence Templates (Starter Items)</option>
                                        <option value="automated">Sequence Templates (Power Items)</option>
                                        <option value="random-power">Random Templates (Power Items)</option>
                                        <option value="pro-manual">Random Templates (Pro Items)</option>
                                        <option value="pro-sequences">Automated Sequences (Pro Items)</option>
                                    </select>
                                </div>

                                {selectedTemplate === "random" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Choose Template
                                        </label>
                                        <select
                                            value={selectedEmailTemplate}
                                            onChange={(e) => handleEmailTemplateChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        >
                                            <option value="">Select a template</option>
                                            {emailTemplates.map((template) => (
                                                <option key={template.id} value={template.id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {selectedTemplate === "random-power" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Choose Power Plan Template
                                        </label>
                                        <select
                                            value={selectedRandomTemplate}
                                            onChange={(e) => handleRandomTemplateChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        >
                                            <option value="">Select a Power Plan template</option>
                                            {manualEmailTemplates.map((template) => (
                                                <option key={template.id} value={template.id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedRandomTemplate && (
                                            <div className="mt-2 p-3 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/30 rounded-lg">
                                                <p className="text-sm text-gray-300">
                                                    <strong>Purpose:</strong> {manualEmailTemplates.find(t => t.id === selectedRandomTemplate)?.purpose}
                                                </p>
                                                <p className="text-sm text-gray-300 mt-1">
                                                    <strong>Use when:</strong> {manualEmailTemplates.find(t => t.id === selectedRandomTemplate)?.useWhen}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedTemplate === "manual" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Choose Day
                                        </label>
                                        <select
                                            value={selectedSequenceDay}
                                            onChange={(e) => handleSequenceDayChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        >
                                            <option value="">Select a day</option>
                                            {emailSequences.map((sequence) => (
                                                <option key={sequence.id} value={sequence.id}>
                                                    {sequence.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {selectedTemplate === "automated" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Choose Automated Sequence
                                            </label>
                                            <select
                                                value={selectedAutomatedSequence}
                                                onChange={(e) => handleAutomatedSequenceChange(e.target.value)}
                                                className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                            >
                                                <option value="">Select a sequence</option>
                                                {automatedSequences.map((sequence) => (
                                                    <option key={sequence.id} value={sequence.id}>
                                                        {sequence.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedAutomatedSequence && (
                                                <div className="mt-2 p-3 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/30 rounded-lg">
                                                    <p className="text-sm text-gray-300">
                                                        <strong>Description:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.description}
                                                    </p>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        <strong>Duration:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.duration} •
                                                        <strong> Emails:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emailCount} •
                                                        <strong> Priority:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.priority}
                                                    </p>
                                                </div>
                                            )}
                                        </div>

                                        {selectedAutomatedSequence && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Choose Email from Sequence
                                                </label>
                                                <select
                                                    value={selectedAutomatedEmail}
                                                    onChange={(e) => handleAutomatedEmailChange(e.target.value)}
                                                    className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                                >
                                                    <option value="">Select an email</option>
                                                    {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emails.map((email) => (
                                                        <option key={email.id} value={email.id}>
                                                            Day {email.day}: {email.subject}
                                                        </option>
                                                    ))}
                                                </select>
                                                {selectedAutomatedEmail && (
                                                    <div className="mt-2 p-2 bg-slate-600/50 rounded text-xs text-gray-300">
                                                        <strong>Purpose:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emails.find(e => e.id === selectedAutomatedEmail)?.purpose}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedTemplate === "pro-manual" && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-1">
                                            Choose Pro Manual Template
                                        </label>
                                        <select
                                            value={selectedRandomTemplate}
                                            onChange={(e) => handleRandomTemplateChange(e.target.value)}
                                            className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                        >
                                            <option value="">Select a Pro template</option>
                                            {manualEmailTemplates.filter(template =>
                                                ['unicorn-property', 'confidential-market-intel', 'luxury-estate-preview',
                                                    'portfolio-diversification', 'algorithm-opportunity', 'predictive-market-analysis',
                                                    'business-connection', 'achievement-celebration', 'market-disruption-alert'].includes(template.id)
                                            ).map((template) => (
                                                <option key={template.id} value={template.id}>
                                                    {template.name}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedRandomTemplate && (
                                            <div className="mt-2 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg">
                                                <p className="text-sm text-gray-300">
                                                    <strong>Purpose:</strong> {manualEmailTemplates.find(t => t.id === selectedRandomTemplate)?.purpose}
                                                </p>
                                                <p className="text-sm text-gray-300 mt-1">
                                                    <strong>Use when:</strong> {manualEmailTemplates.find(t => t.id === selectedRandomTemplate)?.useWhen}
                                                </p>
                                                <div className="mt-2 text-xs text-purple-300 font-semibold">
                                                    💎 PRO PLAN EXCLUSIVE
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {selectedTemplate === "pro-sequences" && (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                                Choose Pro Automated Sequence
                                            </label>
                                            <select
                                                value={selectedAutomatedSequence}
                                                onChange={(e) => handleAutomatedSequenceChange(e.target.value)}
                                                className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                            >
                                                <option value="">Select a Pro sequence</option>
                                                {automatedSequences.filter(sequence =>
                                                    ['luxury-buyer-cultivation', 'investment-property-mastery', 'vip-past-client-nurture'].includes(sequence.id)
                                                ).map((sequence) => (
                                                    <option key={sequence.id} value={sequence.id}>
                                                        {sequence.name}
                                                    </option>
                                                ))}
                                            </select>
                                            {selectedAutomatedSequence && (
                                                <div className="mt-2 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-lg">
                                                    <p className="text-sm text-gray-300">
                                                        <strong>Description:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.description}
                                                    </p>
                                                    <p className="text-sm text-gray-300 mt-1">
                                                        <strong>Duration:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.duration} •
                                                        <strong> Emails:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emailCount} •
                                                        <strong> Priority:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.priority}
                                                    </p>
                                                    <div className="mt-2 text-xs text-purple-300 font-semibold">
                                                        🧠 PRO PLAN EXCLUSIVE
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {selectedAutomatedSequence && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-1">
                                                    Choose Email from Pro Sequence
                                                </label>
                                                <select
                                                    value={selectedAutomatedEmail}
                                                    onChange={(e) => handleAutomatedEmailChange(e.target.value)}
                                                    className="w-full px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                                >
                                                    <option value="">Select an email</option>
                                                    {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emails.map((email) => (
                                                        <option key={email.id} value={email.id}>
                                                            Day {email.day}: {email.subject}
                                                        </option>
                                                    ))}
                                                </select>
                                                {selectedAutomatedEmail && (
                                                    <div className="mt-2 p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded text-xs text-gray-300">
                                                        <strong>Purpose:</strong> {automatedSequences.find(s => s.id === selectedAutomatedSequence)?.emails.find(e => e.id === selectedAutomatedEmail)?.purpose}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Message
                            </label>
                            <textarea
                                value={form.body}
                                onChange={(e) => setForm(prev => ({ ...prev, body: e.target.value }))}
                                className="w-full min-h-[300px] px-3 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
                                placeholder="Type your message here..."
                                required
                            />
                        </div>

                        <div className="p-4 border-t border-[var(--primary-color)]/30 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                                    title="Attach file"
                                >
                                    <Paperclip className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 text-gray-300 hover:text-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="px-6 py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSending ? (
                                        <>
                                            <RefreshCw className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Send
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ------------------------ Email Detail Modal --------------------------- */

function EmailDetailModal({ open, email, onClose, onReply, onReplyAll, onForward, onDelete }) {
    if (!open || !email) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[var(--medium-dark)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-[var(--primary-color)]/30">
                    <h2 className="text-xl font-semibold text-gray-200 truncate">
                        {email.subject}
                    </h2>
                    <div className="flex items-center gap-4">
                        <select
                            value={email.assignee || ""}
                            onChange={(e) => {
                                const newAssignee = e.target.value;
                                console.log("Assign", email.id, "to", newAssignee);
                                email.assignee = newAssignee; // local mut, ok for dummy
                            }}
                            className="bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 text-gray-200 text-sm rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] p-1"
                        >
                            <option value="">Unassigned</option>
                            <option value="Alice">Alice</option>
                            <option value="Bob">Bob</option>
                            <option value="Charlie">Charlie</option>
                        </select>

                        <button
                            onClick={() => onReply(email)}
                            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                            title="Reply"
                        >
                            <Reply className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onReplyAll(email)}
                            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                            title="Reply All"
                        >
                            <ReplyAll className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onForward(email)}
                            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                            title="Forward"
                        >
                            <Forward className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onDelete(email)}
                            className="p-2 text-red-400 hover:text-red-200 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onClose()}
                            className="p-2 text-gray-400 hover:text-gray-200 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="p-4 border-b border-[var(--primary-color)]/30">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                                <span className="text-white font-medium">
                                    {email.from.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <div className="text-gray-200 font-medium">{email.from}</div>
                                <div className="text-sm text-gray-400">{email.to}</div>
                            </div>
                        </div>
                        <div className="text-sm text-gray-400">
                            {formatDate(email.date)}
                        </div>
                    </div>
                </div>

                <div className="p-4 border-b border-[var(--primary-color)]/30 flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center flex-wrap gap-1">
                        {email.tags?.map((tag, idx) => (
                            <TagBadge key={idx} tag={tag} onRemove={() => {
                                const newTags = email.tags.filter(t => t !== tag);
                                email.tags = newTags;
                                console.log("Removed tag", tag, "from", email.id);
                                // setShowEmailDetail({ ...email }); // This line was removed as per the edit hint
                            }} />
                        ))}
                        {(!email.tags || email.tags.length === 0) && (
                            <span className="text-sm text-gray-500">No tags</span>
                        )}
                        <select
                            defaultValue=""
                            onChange={(e) => {
                                const newTag = e.target.value;
                                if (!newTag) return;
                                if (!email.tags.includes(newTag)) {
                                    email.tags.push(newTag);
                                    console.log("Added tag", newTag, "to", email.id);
                                    // setShowEmailDetail({ ...email }); // This line was removed as per the edit hint
                                }
                                e.target.value = "";
                            }}
                            className="bg-[var(--lighter-dark)] border border-[var(--primary-color)]/30 text-gray-200 text-xs rounded-lg focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] p-1 ml-1"
                        >
                            <option value="">+ Tag</option>
                            {[
                                "General",
                                "Resolved",
                                "Offer",
                                "Listing",
                                "Market",
                                "Feedback",
                            ].map((t) => (
                                <option key={t} value={t} disabled={email.tags?.includes(t)}>
                                    {t}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="text-sm text-gray-400 shrink-0">
                        <span className="font-medium text-gray-300 mr-1">Assignee:</span>
                        {email.assignee || "Unassigned"}
                    </div>
                </div>

                <div className="p-4 overflow-y-auto max-h-[calc(90vh-260px)] space-y-6">
                    {email.thread && email.thread.length > 0 ? (
                        email.thread.map((msg, idx) => (
                            <div key={idx} className="border border-[var(--primary-color)]/20 rounded-lg p-4 bg-[var(--lighter-dark)]">
                                <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
                                    <span>{msg.from} ➜ {msg.to}</span>
                                    <span>{formatDate(msg.date)}</span>
                                </div>
                                <div className="text-gray-200 whitespace-pre-wrap">
                                    {msg.body}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-gray-200 whitespace-pre-wrap">
                            {email.body}
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}

/* ---------------------- reusable components -------------------- */

function TagBadge({ tag, onRemove }) {
    return (
        <span className="flex items-center text-xs bg-[var(--primary-color)]/20 text-[var(--primary-color)] px-2 py-0.5 rounded-full mr-1 last:mr-0 capitalize">
            {tag}
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="ml-1 text-[var(--primary-color)] hover:text-white"
                >
                    <X className="w-3 h-3" />
                </button>
            )}
        </span>
    );
}


/* ======================= MAIN COMPONENT ======================== */

const EmailInbox = () => {
    const { user, loading: authLoading } = useAuth();

    console.log('USERID', user)

    const USER_ID = user?._id || user?.id;

    // If auth still loading we'll keep component in loading state
    const initialLoading = authLoading || !USER_ID;

    const [isLoading, setIsLoading] = useState(initialLoading);

    const [selectedFolder, setSelectedFolder] = useState("inbox");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEmails, setSelectedEmails] = useState(new Set());
    const [showCompose, setShowCompose] = useState(false);
    const [showEmailDetail, setShowEmailDetail] = useState(null);
    const [replyToEmail, setReplyToEmail] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const [emails, setEmails] = useState([]);
    const [isError, setIsError] = useState(false);

    // Check for URL parameter to auto-open compose modal
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('compose') === 'true') {
            setShowCompose(true);
            // Clean up the URL parameter
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, []);

    const fetchEmails = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${apiBaseUrl}/emails/all/${USER_ID}`);
            const json = await res.json();
            if (!json.success) throw new Error("API error");
            const mapped = json.data.map((item) => ({
                id: item._id,
                from: item.from,
                to: Array.isArray(item.to) ? item.to.join(", ") : item.to,
                subject: item.subject,
                body: item.text,
                date: item.createdAt,
                isRead: item.isRead,
                isStarred: false,
                folder: item.type === "send" ? "sent" : "inbox",
                attachments: [],
                tags: item.tags || [],
                assignee: item.assignee || "Unassigned",
                thread: [
                    {
                        from: item.from,
                        to: Array.isArray(item.to) ? item.to.join(", ") : item.to,
                        body: item.text,
                        date: item.createdAt,
                    },
                ],
            }));
            setEmails(mapped);
            setIsError(false);
        } catch (err) {
            console.error(err);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!USER_ID) return; // wait for user
        fetchEmails();
    }, [USER_ID]);

    // update loading when auth resolved but fetch not yet run
    useEffect(() => {
        if (!authLoading && !USER_ID) {
            setIsLoading(false);
        }
    }, [authLoading, USER_ID]);

    const unreadCount = emails ? emails.filter(email => email && !email.isRead && email.folder === "inbox").length : 0;
    const refetch = () => console.log("Refetch called");

    const filteredEmails = useMemo(() => {
        if (!emails || !Array.isArray(emails)) {
            return [];
        }

        let filtered = emails.filter(email => {
            if (!email) return false;

            const matchesFolder = email.folder === selectedFolder;
            const matchesSearch = !searchQuery ||
                (email.subject && email.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (email.from && email.from.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (email.body && email.body.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (email.tags && email.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
            return matchesFolder && matchesSearch;
        });

        // Sort by date (newest first) - handle both 'date' and 'timestamp' fields
        return filtered.sort((a, b) => {
            try {
                const dateA = new Date(a.date || a.timestamp || 0);
                const dateB = new Date(b.date || b.timestamp || 0);
                return dateB - dateA;
            } catch (error) {
                console.error("Error sorting emails:", error);
                return 0;
            }
        });
    }, [emails, selectedFolder, searchQuery]);

    const handleEmailSelect = (emailId) => {
        setSelectedEmails(prev => {
            const newSet = new Set(prev);
            if (newSet.has(emailId)) {
                newSet.delete(emailId);
            } else {
                newSet.add(emailId);
            }
            return newSet;
        });
    };


    const handleReply = (email) => {
        setReplyToEmail(email);
        setShowCompose(true);
        setShowEmailDetail(null);
    };

    const handleReplyAll = (email) => {
        // TODO: Implement reply all functionality
        console.log("Reply all to:", email);
    };

    const handleForward = (email) => {
        // TODO: Implement forward functionality
        console.log("Forward:", email);
    };

    const handleDelete = async (email) => {
        console.log("Delete email:", email.id);
        // TODO: Implement delete functionality when API is ready
    };

    const handleToggleStar = async (emailId, isStarred) => {
        console.log("Toggle star:", emailId, isStarred);
        // TODO: Implement star toggle when API is ready
    };

    const handleMarkAsRead = async (emailId, isRead) => {
        console.log("Mark as read:", emailId, isRead);
        // TODO: Implement mark as read when API is ready
    };

    const handleSendEmail = async (emailData) => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock successful email send
        console.log("Email sent successfully:", {
            to: emailData.to,
            subject: emailData.subject,
            body: emailData.body
        });

        // Simulate adding to sent emails
        const newEmail = {
            id: Date.now().toString(),
            from: user?.email || "you@example.com",
            to: emailData.to,
            subject: emailData.subject,
            body: emailData.body,
            date: new Date().toISOString(),
            isRead: true,
            isStarred: false,
            folder: "sent",
            attachments: [],
            tags: [],
            assignee: "Unassigned",
            thread: [
                {
                    from: user?.email || "you@example.com",
                    to: emailData.to,
                    body: emailData.body,
                    date: new Date().toISOString(),
                },
            ],
        };

        // Add to emails list
        setEmails(prev => [newEmail, ...prev]);

        // Show success message
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);

        console.log("Email added to sent folder:", newEmail);

        return { success: true, message: "Email sent successfully" };
    };

    const folders = [
        { id: "inbox", name: "Inbox", icon: Inbox, count: unreadCount },
        { id: "sent", name: "Sent", icon: Send, count: emails ? emails.filter(email => email && email.folder === "sent").length : 0 },
        { id: "starred", name: "Starred", icon: Archive, count: emails ? emails.filter(email => email && email.isStarred).length : 0 },
        { id: "archive", name: "Archive", icon: Archive, count: emails ? emails.filter(email => email && email.folder === "archive").length : 0 },
        { id: "trash", name: "Trash", icon: Trash2, count: emails ? emails.filter(email => email && email.folder === "trash").length : 0 },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-96"></div>
                </div>
                <div className="flex gap-6">
                    <div className="w-64 bg-gray-200 h-96 rounded-xl"></div>
                    <div className="flex-1 bg-gray-200 h-96 rounded-xl"></div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">
                        Error Loading Emails
                    </h3>
                    <p className="text-red-600 mb-4">
                        Failed to load emails. Please try again.
                    </p>
                    <button
                        onClick={() => refetch()}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    // Safety check to prevent blank screen
    if (!emails) {
        return (
            <div className="space-y-6">
                <div className="p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Loading...</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
                    ✓ Email sent successfully!
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-200">Email Inbox</h1>
                    <p className="text-gray-400 mt-1">Manage your team's shared email communications</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCompose(true)}
                        className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/80 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Compose
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Sidebar */}
                <div className="w-64 bg-[var(--medium-dark)] rounded-xl p-4">
                    <div className="space-y-2">
                        {folders.map((folder) => (
                            <button
                                key={folder.id}
                                onClick={() => setSelectedFolder(folder.id)}
                                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${selectedFolder === folder.id
                                    ? "bg-[var(--primary-color)] text-white"
                                    : "text-gray-300 hover:bg-[var(--lighter-dark)]"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <folder.icon className="w-4 h-4" />
                                    <span>{folder.name}</span>
                                </div>
                                {folder.count !== null && (
                                    <span className={`text-xs px-2 py-1 rounded-full ${selectedFolder === folder.id
                                        ? "bg-white/20 text-white"
                                        : "bg-[var(--primary-color)] text-white"
                                        }`}>
                                        {folder.count}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-[var(--medium-dark)] rounded-xl">
                    {/* Search and Actions */}
                    <div className="p-4 border-b border-[var(--primary-color)]/30">
                        <div className="flex items-center gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search emails..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-[var(--primary-color)]/30 rounded-lg bg-[var(--lighter-dark)] text-gray-200 focus:ring-1 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
                                />
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Email List */}
                    <div className="divide-y divide-[var(--primary-color)]/30">
                        {filteredEmails.length === 0 ? (
                            <div className="p-8 text-center">
                                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-300 mb-2">No emails found</h3>
                                <p className="text-gray-400">
                                    {searchQuery ? "Try adjusting your search terms" : "No emails in this folder"}
                                </p>
                            </div>
                        ) : (
                            filteredEmails.map((email) => (
                                <div
                                    key={email.id}
                                    className={`p-4 hover:bg-[var(--lighter-dark)] transition-colors cursor-pointer ${!email.isRead ? "bg-blue-50/5" : ""
                                        }`}
                                    onClick={() => setShowEmailDetail(email)}
                                >
                                    <div className="flex items-center gap-3">
                                        {/* Checkbox removed */}

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-medium ${!email.isRead ? "text-gray-200" : "text-gray-300"
                                                        }`}>
                                                        {email.from}
                                                    </span>
                                                    {!email.isRead && (
                                                        <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full"></div>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-400">
                                                    {formatDate(email.date)}
                                                </span>
                                            </div>
                                            <div className={`text-sm ${!email.isRead ? "text-gray-200" : "text-gray-400"
                                                }`}>
                                                {email.subject}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {email.tags.map((tag, index) => (
                                                    <TagBadge key={index} tag={tag} />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate">
                                                {email.body.substring(0, 100)}...
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            {email.attachments.length > 0 && (
                                                <Paperclip className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EmailComposeModal
                open={showCompose}
                onClose={(success) => {
                    setShowCompose(false);
                    setReplyToEmail(null);
                    // If email was sent successfully, switch to Sent folder
                    if (success) {
                        setSelectedFolder("sent");
                    }
                }}
                replyTo={replyToEmail}
                onSendEmail={handleSendEmail}
            />

            <EmailDetailModal
                open={Boolean(showEmailDetail)}
                email={showEmailDetail}
                onClose={() => setShowEmailDetail(null)}
                onReply={handleReply}
                onReplyAll={handleReplyAll}
                onForward={handleForward}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default EmailInbox;
