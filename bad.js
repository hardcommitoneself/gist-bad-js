/**
 * Please, improve this component and fix all problems.
 *
 * What is important:
 * - design (extensibility, testability)
 * - code cleanliness, following best practices
 * - bugs
 * - consistency
 * - naming
 * - formatting
 *
 * Write your perfect code!
 */

import React, { useEffect, useState } from 'react';

const Card = (props) => {
    const {title, text, target, linkTitle, href, rel, linkClassName, onClick } = props;
    return (
        <div className="card">
            <div className="card__title">{title}</div>
            <div className="card__text">{text}</div>
            <a
                className={`default-link card__link ${linkClassName}`} 
                target={target} 
                rel={rel} 
                href={href} 
                onClick={onClick}
                data-testid="link-card"
            >
                {linkTitle}
            </a>
        </div>
    );
}

const analyticsTrackClick = (url) => {
    // sending clicked link url to analytics
    console.log(url);
}

export default function Page () {
  const [cards, setCards] = useState();

  useEffect(() => {
    const loadData = async () => {
        var data = await fetch('https://my-json-server.typicode.com/savayer/demo/posts');
        let json = data.json();
    
        let newData = [];
        json.forEach((item) => newData.push({
            id: item.id,
            title: item.title,
            linkTitle: item.link_title,
            link: item.link,
            text: item.body.en.substr(0, 50) + '...'
        }));
    
        setCards(newData);
    }

    loadData();
  }, []);

  return (
    <div>
        {
            cards.map((item, index) => (
                <Card
                    key={index}
                    title={item.title.en} 
                    linkTitle={item.linkTitle} 
                    href={item.link} 
                    text={item.text} 
                    linkClassName={item.id == 1 ? 'card__link--red' : ''} 
                    target={item.id == 1 ? '_blank' : ''}
                    onClick={analyticsTrackClick(item.link)}
                />
            ))
        }
    </div>
  );
}