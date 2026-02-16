import MainAboutUs from './about/MainAboutUs';
import CorePhilosophy from './about/CorePhilosophy';
import MeetOurExpertTeam from './about/MeetOurExpertTeam';
import QuickQuerySection from './home/QuickQuerySection';

const About = () => {
  return (
    <div style={{ paddingTop: '72px' }}>
      <MainAboutUs />
      <CorePhilosophy />
      <MeetOurExpertTeam />
      <QuickQuerySection/>
    </div>
  );
};

export default About;