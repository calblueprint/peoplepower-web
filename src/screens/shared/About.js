import React from 'react';
import 'react-table-v6/react-table.css';
import '../../styles/App.css';

class About extends React.PureComponent {
  render() {
    return (
      <div className="about-page">
        <div className="cont">
          <h1>About</h1>
          <div className="about-card">
            <div>
              <h2>
                Our mission is to create a just and inclusive transition to
                renewable energy by enabling everyone to own and shape our
                energy future.
              </h2>
              <p>
                With the growing emergency around the climate crisis, there is
                soon to be a national shift to renewable energy. If we don’t act
                now we risk a further consolidation of power by the for-profit
                fossil fuel companies, utilities, financiers, and developers
                that have been extracting wealth and health from our communities
                for decades.
              </p>
              <p>
                Growing The Movement. People Power Solar Cooperative is building
                a movement toward grassroots-led and community-owned solar, a
                critical piece of a justice-based transition to a sustainable
                economy. While climate justice groups everywhere are advocating
                for energy democracy, very few community-owned solar projects
                exist in California or most of the United States due to the
                substantial technical, financial, and legal barriers to
                community-owned solar. This is why we’re building the skills,
                leadership, and people power in our communities to overcome
                these barriers and get everyday people involved in solar
                development. Two key innovations allow us to work:
              </p>
              <h2>Project Groups</h2>
              <p>
                People Power is centered on the creation and success of its
                “Project Groups”. These Project Groups are initiated by
                individuals and organizations, and include, for example, a
                community group coming together to organize a solar project or a
                group of people spearheading a policy advocacy campaign. Many
                Project Groups function much like self-governing “cooperatives”
                under the umbrella of the broader Cooperative, much as
                fiscally-sponsored projects do in the nonprofit sector.
              </p>
              <h2>Decentralization</h2>
              <p>
                We prioritize decentralized governance because it builds people
                power, creates resiliency, and fosters a strong sense of
                ownership, activating people to build and steward our energy
                resources in the long-term. To offer a visual explanation of
                what decentralization under People Power looks like: If People
                Power were a galaxy, many Project Groups and other activities
                within People Power would be solar systems within that galaxy,
                and the owners involved in that project would be planets
                orbiting these solar systems.
              </p>
              <br />
              <br />
              <h2>Blueprint, Technology for Non-profits</h2>
              <p>
                This project is kickstarted off the ground with a team of
                developers from Blueprint (Berkeley). Blueprint, Technology for
                Non-profits (Berkeley) is a club at UC Berkeley that aims to
                make beautiful engineering accessible and useful for those who
                create communities and promote public welfare.
              </p>
              <h2>
                Special thanks to the 2019 - 2020 Blueprint project team
                comprising Aivant Goyal, Ashley Nguyen, Fang Shuo Deng, Iris
                Hou, Nick Wong, and Cindy Zhang for building this website from
                the ground up!
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
