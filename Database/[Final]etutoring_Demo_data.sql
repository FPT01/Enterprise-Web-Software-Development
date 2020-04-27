-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2020 at 12:57 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `etutoring`
--

-- --------------------------------------------------------

--
-- Table structure for table `allocation`
--

CREATE TABLE `allocation` (
  `id` bigint(20) NOT NULL,
  `room_id` bigint(20) DEFAULT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `tutor_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `allocation`
--

INSERT INTO `allocation` (`id`, `room_id`, `student_id`, `tutor_id`) VALUES
(24, 1, 1, 2),
(25, 1, 2, 2),
(28, 3, 3, 1),
(29, 3, 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `blog_comment`
--

CREATE TABLE `blog_comment` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `creation_time` datetime(6) DEFAULT NULL,
  `blog_post_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog_comment`
--

INSERT INTO `blog_comment` (`id`, `content`, `creation_time`, `blog_post_id`, `user_id`) VALUES
(6, 'Student Comment on Student blog', '2020-04-27 08:00:53.000000', 3, 2),
(7, 'Student Comment on Admin Blog', '2020-04-27 08:01:09.000000', 1, 2),
(8, 'Student Comment on Staff Blog', '2020-04-27 08:01:24.000000', 2, 2),
(9, 'Staff Comment on Staff Blog', '2020-04-27 08:02:26.000000', 2, 5),
(10, 'Staff Comment on Student Blog', '2020-04-27 08:02:39.000000', 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `blog_post`
--

CREATE TABLE `blog_post` (
  `id` bigint(20) NOT NULL,
  `content` longtext DEFAULT NULL,
  `creation_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `blog_post`
--

INSERT INTO `blog_post` (`id`, `content`, `creation_time`, `modified_time`, `title`, `user_id`) VALUES
(1, 'Edited 2 - Edited - President Donald Trump said his administration may extend the guidelines for social distancing past spring and into early summer at Thursday\'s coronavirus task force meeting from the White House. In March, Trump said the guidelines would be in place until April 30.\n\nIn recent days, governors across the U.S. have started planning for the reopening of businesses in their states through phased approaches that feature social distancing protocols as a criterion for getting employees bak to work. Although recent data has indicated that coronavirus cases could decline during the summer, Trump said the guidelines would continue \"until we feel it\'s safe.\"\n\n\"We\'ll have to see where [coronavirus] is,\" the president said. \"I think people are going to know. You\'re going to know. I\'m going to know. I think people are going to know just out of common sense. At some point we won\'t have to do that. But until we feel it\'s safe we\'re going to be extending.\"\n\nSocial distancing could last months, White House coronavirus coordinator says\n\nSome form of social distancing will probably remain in place through the summer, Deborah Birx, the White House’s coronavirus task force coordinator, said Sunday — the same day several governors expressed optimism about the course of the virus and outlined their plans for a piecemeal reopening of their economies.\n\nBing COVID-19 tracker: Latest numbers by country and state\n\nIt was the latest instance of conflicting signals coming not just from state and federal leaders but also from within the Trump administration in the midst of a coronavirus pandemic that so far has claimed the lives of more than 54,000 Americans. Last week, Vice President Pence predicted that “we will largely have this coronavirus epidemic behind us” by Memorial Day weekend.\n\nBut on Sunday, Birx said in an interview on NBC News’s “Meet the Press” that “social distancing will be with us through the summer to really ensure that we protect one another as we move through these phases.” She cited the need for further testing that would need to be developed following a scientific “breakthrough.”\n\nSubscribe to the Post Most newsletter: Today’s most popular stories on The Washington Post\n\nThe mixed messages come as Americans are entering a confusing and uncertain new phase in the coronavirus crisis. After weeks of being told to simply stay home to halt the spread of the virus, individuals and business owners are now facing more complex decisions about how to proceed in the absence of clear guidance from their leaders.\n\nIn places where restaurant dining rooms are reopening, is it safe to go? Is it a good idea to return to the hair salon for a much-needed trim? And for business owners facing a litany of new guidelines about how to reopen without endangering their workers or customers, are the risks worth it?\n\nEmily Landon, chief infectious disease epidemiologist at University of Chicago Medicine, said those calculations are tricky for people in states that are beginning to reopen because of the continued lack of widespread testing and the inability to effectively track people who might have been infected.\n\n“It’s hard for me to know what I’d do” in one of the states where governors have announced spas and salons are reopening, Landon said. “I wouldn’t go. And I wouldn’t recommend that my family went. I would recommend that people stay home.”\n\nLandon said that in her view, it’s still not safe for states to fully reopen — or for Americans to try to resume their lives as they were before the pandemic hit.\n\n“This is a brand-new virus, and we have to do these things in a measured way,” she said. “Without requirements for things like [personal protective equipment], social distancing and really thoughtful policies for how to do these openings, it’s not the time to do them.”\n\nIn its broad guidelines for states to follow as they begin a phased reopening, the White House earlier this month recommended that a number of criteria, such as increasing capacity for testing and contact tracing, should be met before proceeding.\n\nSlide 1 of 49: OAK PARK, ILLINOIS - APRIL 26: Residents listen at a \"social distance\" as singer/guitarist Phil Angotti performs songs from the back of a pick-up truck on April 26, 2020 in Oak Park, Illinois. Owner Will Duncan of Fitzgerald\'s nightclub, a suburban music venue and restaurant shuttered due to the COVID-19 pandemic, created a \"Stay-at-Home Concert Series\" to bring music from local Chicago artists each weekend to fans in suburbs close to the club. (Photo by Jonathan Daniel/Getty Images)\nNext Slide\nFull screen\n1/49 SLIDES © Jonathan Daniel/Getty Images\nResidents listen at a \"social distance\" as singer/guitarist Phil Angotti performs songs from the back of a pick-up truck on April 26 in Oak Park, Illinois. Owner Will Duncan of Fitzgerald\'s nightclub, a suburban music venue and restaurant shuttered due to the COVID-19 pandemic, created a \"Stay-at-Home Concert Series\" to bring music from local Chicago artists each weekend to fans in suburbs close to the club. \nSlideshow by photo services\nAcross the country, however, some states are already relaxing their social distancing restrictions over pressure from protesters, business groups and others.\n\nOn Sunday, several governors defended their decision to do so, arguing that their states’ closures have successfully achieved their goal of building hospital capacity, acquiring personal protective equipment and flattening the curve of the pandemic’s growth.\n\n“The facts in our state are: March 30, we peaked in hospitalizations, with 560 across the state,” Oklahoma Gov. Kevin Stitt (R) said on “Fox News Sunday.” “Today we have 300 across the state in our hospitals. We think it’s time for a measured reopening.”\n\nStitt said that more than 55,000 Oklahomans have been tested and that the positive rate was 6.3 percent. He also noted that no one is obliged to reopen a business.\n\n“I’m giving guidance. If a restaurant doesn’t feel like they’re ready to reopen,” he said, “they don’t have to.”\n\nOn CNN’s “State of the Union,” Colorado Gov. Jared Polis (D) also defended his decision to partially reopen his state, and maintained that he is focused on social distancing measures that are sustainable for the coming weeks and months.\n\n“We’ve really been laser-focused on figuring out how we can endure and sustain these kinds of social distancing measures,” Polis said. “If we can’t succeed in doing that, the stay-at-home was for nothing.”\n\nPolis said an apparent spike in coronavirus cases in Colorado was attributable to previous tests that were just confirmed and added to the total, and does not reflect the present situation.\n\nThe debate over reopening in the United States comes as another hard-hit country, Spain, allowed children under 14 to go outside for the first time in six weeks. The country, which has had more than 207,000 coronavirus cases and 23,190 deaths, has been in the midst one of Europe’s strictest lockdowns since last month.\n\nBritish Prime Minister Boris Johnson, meanwhile, is set to return to work Monday after more than three weeks battling a coronavirus infection. Foreign Secretary Dominic Raab, who has been standing in for Johnson, told Sky News on Sunday that the prime minister is “raring to go.”\n\nIn the United States, the steps being taken toward reopening vary by state. In some places, such as Florida, beaches have reopened on a limited basis, with police urging visitors to keep moving and avoid congregating.\n\nIn Oklahoma, Stitt gave salons, barbers and pet groomers the green light to resume business late last week, and restaurants will be allowed to reopen their doors Friday.\n\nIn New York, Gov. Andrew M. Cuomo (D) said Sunday that construction and manufacturing businesses outside of the New York City region might be able to reopen after May 15, when the state’s stay-at-home order expires.\n\nAnd in Georgia, businesses including bowling alleys, tattoo parlors, gyms and hair salons have already been allowed to reopen, with movie theaters and dine-in restaurants expected to follow suit Monday.\n\nGeorgia Gov. Brian Kemp (R) has come under fire for the speed with which he has rolled back social distancing restrictions, and on Sunday, former Food and Drug Administration commissioner Scott Gottlieb said the state is opening up too early.\n\n“Georgia is certainly jumping the gun, I think here, getting started too early relative to where they are in the epidemic,” Gottlieb said on CBS News’s “Face the Nation.”\n\nAsked whether he thinks states such as Georgia and Oklahoma are reopening too quickly, Maryland Gov. Larry Hogan (R), chairman of the National Governors Association, said that he was “going to be very cautious” in making decisions about his own state but declined to criticize other governors.\n\n“Certain states are in different points of the curve, and they’ve got different situations on the ground, and I don’t want to second-guess my colleagues in different states,” Hogan said on ABC News’s “This Week.”\n\n\nWhile Pence and President Trump have in recent weeks voiced optimism about the speed with which they expect the country to be able to reopen, Birx and Anthony S. Fauci, director of the National Institute of Allergy and Infectious Diseases, have voiced caution.\n\nOn “Meet the Press” on Sunday, Birx was asked about Pence’s remark to a Cleveland radio station last week that “if you look at the trends today, that I think by Memorial Day weekend we will largely have this coronavirus epidemic behind us.”\n\nShe appeared to contradict Pence’s comment, projecting that social distancing will continue through the summer, and said that the country needs to have a “breakthrough” in testing for antigens — molecules or molecular structures that trigger an immune response — to get on track for normalcy.\n\nAfter a torrent of criticism sparked by his suggestion at Thursday’s coronavirus task force briefing that injecting disinfectants into the human body might help fight the coronavirus, Trump did not appear in public over the weekend. On Saturday night, he questioned in a tweet whether the task force briefings were worth his time, declaring, “They get record ratings, & the American people get nothing but Fake News.”\n\nOn Sunday, his wife’s 50th birthday, Trump continued to tweet angrily about the media, lashing out at reporters who he said “have received Noble Prizes for their work on Russia, Russia, Russia, only to have been proven totally wrong.”\n\nTrump appeared to have misspelled the Nobel Prize, although journalists recognized for their coverage of the Russia investigation received a different prize, the Pulitzer. He later deleted the tweets and then tweeted that he was being sarcastic.\n\nDespite Trump’s efforts to change the topic, Democrats continued to hammer him for his remarks about disinfectants as a possible cure for the virus.\n\n“You know what they call that? They call that embalming,” House Speaker Nancy Pelosi (D-Calif.) said on CNN’s “State of the Union.” “That’s the medical term.”\n\nfelicia.sonmez@washpost.com\n\npaige.cunningham@washpost.com\n\nmeryl.kornfield@washpost.com\n\nPamela Rolfe in Madrid and Kim Bellware, Peter Whoriskey and Siobhán O’Grady in Washington contributed to this report.\n\n', '2020-04-24 07:20:53.000000', '2020-04-27 07:49:24.000000', 'Admin Blog 1 - edited - 2 edits', 1),
(2, 'Edited - WASHINGTON – A popular small-business loan program that closed last week when it ran out of money is about to get a cash infusion.\n\nThe House approved legislation Thursday that would pump $320 billion into the Paycheck Protection Program, which is designed to keep small businesses from shuttering and their workers from going on unemployment during the coronavirus pandemic. The Senate approved the bill Tuesday.\n\nOther programs would get money under the bill. The $484 billion legislation includes funding for hospitals that have been overwhelmed during the crisis and money for a coronavirus testing program.\n\nStart the day smarter. Get all the news you need in your inbox each morning.\n\nHere’s a look at what’s in the bill:\nCoronavirus live updates: U.S. reaches \'plateau,\' nears 1 million cases; last patient leaves hospital in Wuhan\nSlideshow by photo services\nThe number of confirmed coronavirus cases in the U.S. was closing in on 1 million Sunday, but new cases appear to have reached a plateau, one of the nation\'s top experts said.\n\n“Unfortunately, it is a very high plateau,\" said Tom Inglesby, director of the Johns Hopkins Center for Health Security.\n\nNew York Gov. Andrew Cuomo said the daily death total in his state, the epicenter of the U.S. outbreak, fell below 400 for the first time in weeks. When the state does begin to reopen, construction and manufacturing will be in the first wave, he said.\n\nStart the day smarter. Get all the news you need in your inbox each morning.\n\nCuomo\'s counterpart in Maryland, Republican Larry Hogan, said President Donald Trump should focus on delivering factual information about the virus to Americans, not f whatever pops into his mind.\n\nAnd in China, the hot-spot city of Wuhan reported that its last hospital patient had been discharged.\n\nThe virus has killed more than 206,000 people globally, according to Johns Hopkins University data. Almost 3 million confirmed cases have been reported, including 963,000 in the U.S., where there have been more than 54,000 deaths.\n\nOur live blog is being updated throughout the day. Refresh for the latest news, and get updates in your inbox with The Daily Briefing. More headlines:\n\nFrom malaria drugs to disinfectant: Here are some of Trump\'s claims about the coronavirus.\nStates brace for huge budget cuts. It\'s not clear that federal help is coming. \nOK, say America does reopen. Are we really ready for that? \nWhy coronavirus death toll is hard to track. Expert says 1 in 3 death certificates wrong. \nPurdue works to reopen college for fall 2020 citing \'zero lethal threat\' \nStaying Apart, Together. Sign up for our newsletter on coping with a world changed by coronavirus. 📧\na person holding a wine glass: A customer gets her eyebrows waxed at Three-13 Salon, Spa & Boutique on April 24, 2020, in Marietta, Georgia. The salon had been closed for more than a month due to the coronavirus. (AP Photo/Ron Harris)© Ron Harris, AP A customer gets her eyebrows waxed at Three-13 Salon, Spa & Boutique on April 24, 2020, in Marietta, Georgia. The salon had been closed for more than a month due to the coronavirus. (AP Photo/Ron Harris)\nHopkins expert: U.S. has reached plateau in new cases\nThe U.S. COVID-19 outbreak has reached a plateau in new cases but probably will not ease much before Memorial Day, said Tom Inglesby, director of the Johns Hopkins Center for Health Security. Inglesby told Fox News Sunday the U.S. is  “near the end of the beginning” of the coronavirus pandemic but was skeptical of Vice President Mike Pence’s claim that the U.S. would \"largely have this coronavirus epidemic behind us\" by Memorial Day.\n\n\"I mean, trends can change over time, but at this point we have a plateau in new cases per day,\" Inglesby said. \"More importantly, wherever we are in the epidemic, this virus is going to be with us until we have a vaccine.\"\n\n\nMaryland Gov. Larry Hogan to Trump: Stick to the facts\nMaryland Gov. Larry Hogan, a Republican who has butted heads with President Trump over his messages about the coronavirus, urged the nation\'s chief executive to use \"fact-based\'\' information in his media briefings. On Thursday, Trump pondered the possibility of introducing disinfectants or ultraviolet light into the human body to kill the coronavirus, which Hogan said prompted hundreds of calls into his state\'s emergency hotline inquiring about ingesting Clorox or cleaning products as a treatment.\n\n\"They certainly pay attention when the president of the United States is standing there giving a press conference about something as serious as this worldwide pandemic,\" Hogan said. \"And I think when misinformation comes out or you just say something that pops in your head, it does send a wrong message.\" \n\n-- William Cummings\n\nClick to expand\n\nLast patient leaves hospital in COVID-19 epicenter of Wuhan, China\nThe number of hospitalized coronavirus patients in Wuhan, the central China city hardest hit by the epidemic, reached zero after the last patient was released Friday, the state-run Xinhua news agency reported. In Hubei province – Wuhan is the capital – the number of existing COVID-19 cases has dropped below 50 for the first time. No new confirmed cases of the disease have been reported for over 20 days in the province, Xinhua said.\n\nThe coronavirus, which is believed to have originated in a wet market in Wuhan, first emerged there in December before spreading worldwide. Wuhan and the province of Hubei were locked down at the end of January. China has reported a death toll of more than 4,600 people but is seeing very few new cases.\n\nGov. Cuomo reveals plans for reopening New York\nNew York\'s statewide daily death toll dipped to 367, the lowest one-day total in weeks and continuing a trend of decline, Gov. Andrew Cuomo said Sunday. He said hospitalization and testing numbers continue to show improvement and that the state agrees with federal guidelines for 14 days of declines before reopening begins. The state will reopen in phases, he said, with construction and some manufacturing part of the first wave.\n\nIn a separate news conference, New York Mayor Bill de Blasio said his city\'s economic reopening might not be completed until 2022. The mayor promised that a \"more just society\" will emerge for the city.\n\n\"We\'re not going to risk people\'s lives, we\'re going to be smart about it,\" he said. \"It will be a reimagination of what this city can be.\"\n\nMore coronavirus news and information from USA TODAY:\nMany states have relaxed restrictions. Find out what your state has.\nCoronavirus will reshape your next trip, for better or worse. Here\'s what to expect.\nCOVID-19 in prisons: Mass virus testing in state prisons reveals hidden asymptomatic infections.\nDo it yourself: How to cut your hair with shops closed during stay-at-home order.\nWorse than thought: Coronavirus at meatpacking plants is major concern.\nCollege students forced home by coronavirus stuck paying rent – for nothing.\nWhen will a second wave of the coronavirus hit? What will it look like?\na man standing next to a plane: Red Cross volunteer Stephane Corbeil adjusts an opening in a tent at a mobile hospital at Jacques Lemaire Arena in the Montreal suburb of LaSalle, Sunday, April 26, 2020.© Graham Hughes, The Canadian Press via AP Red Cross volunteer Stephane Corbeil adjusts an opening in a tent at a mobile hospital at Jacques Lemaire Arena in the Montreal suburb of LaSalle, Sunday, April 26, 2020.\nMost Georgia churches stay shut\nChurches in Georgia did not exactly rush to open their doors Sunday even after Gov. Brian Kemp gave his approval to resuming in-person services if “done in accordance with strict social distancing protocols.” Most churches remained relegated to video streaming or drive-in services.\n\nOne exception was the Redeeming Love Church of God the Bible Way in Statesboro, which held two services Sunday, according to its Facebook page. Both were livestreamed and each appeared to have at least 20 parishioners in attendance. This was the same church whose members recorded video on April 10 of police ordering a service to be broken up.\n\n-- Lorenzo Reyes\n\nCDC expands list of COVID-19 symptoms\nThe Centers for Disease Control and Prevention has added several symptoms attributed to the coronavirus. The CDC now lists fever, cough, shortness of breath or difficulty breathing, chills, repeated shaking with chills, muscle pain, headache, sore throat and loss of sense of taste or smell. The symptoms are important not only as a warning sign to ill people, but because most testing sites require a patient to have a COVID-19 symptom before they can be tested.\n\nThe CDC also recommends seeking \"medical attention immediately\" for trouble breathing, persistent pain or pressure on chest, bluish lips or face or new \"confusion or inability to arouse.\"\n\nGeorgia mayors fight back as businesses reopen\nSavannah, Georgia, Mayor Van Johnson took steps to keep local churches closed, and Atlanta Mayor Keisha Lance Bottoms urged residents to stay home as the state dramatically rolls back its social distancing restrictions. Johnson asked more than 70 Savannah religious leaders to keep their worship centers closed. None of the leaders said they would reopen.\n\nJohnson told the religious leaders he understood the financial burden of the religious institutions being closed but said, \"We can reach God without going through a building.” Georgia has become a high-profile outlier as dozens of states have announced plans to relax social distancing restrictions, but few have yet made major changes.\n\n– Asha Gilbert and Joel Shannon\n\nPork producers may have to \'cull herds\' as processing plants close\nThe federal government says it will help U.S. pork producers find new processors – or potentially destroy thousands of pigs that have backed up on farms – because large meatpacking plants have slowed or closed because of the COVID-19. Pat McGonegle, CEO of the Iowa Pork Producers Association, said farmers \"will need help in a significant way,\" including culling herds, if the state continues to see a widespread loss of processing capacity. Iowa, the nation\'s largest pork producer, has about 25 million pigs.\n\n\"The clock is ticking … it\'s days, not weeks\" when pork producers will face destroying animals because there\'s no longer room for them on farms, McGonegle said. \n\n– Donnelle Eller, Des Moines Register\n\nBritish PM Boris Johnson has recovered, will return to work\nBritish Prime Minister Boris Johnson will return to work Monday after recovering from a coronavirus infection as his government is facing growing criticism over the deaths and disruption the virus has caused. Johnson spent a week at a London hospital, including three nights in intensive care before being released two weeks ago. Foreign Secretary Dominic Raab, who has been standing in for the prime minister, said Johnson – the only world leader to be diagnosed with the coronavirus – was “raring to go.”\n\nBritain has recorded 20,732 deaths among people hospitalized with COVID-19, the fifth country in the world to surpass 20,000 deaths. Thousands more are thought to have died in nursing homes.\n\nBattle brews over bailouts for state, local governments\nThe latest coronavirus assistance package signed into law Friday does not include the hundreds of billions of dollars sought by state and local governments to replenish their coffers. More than $2.5 trillion has been approved for businesses, individuals, hospitals, testing and other immediate needs, but a major political battle looms over government bailouts. \n\n\"The last thing we need in the middle of an economic crisis is to have states all filing bankruptcy all across America,\" Maryland Gov. Larry Hogan, a Republican who heads the National Governors Association, told Politico. But Senate Majority Leader Mitch McConnell, R-Ky., told conservative radio host Hugh Hewitt last week that \"we’re not ready to just send a blank check down to states and local governments to spend any way they choose to.\" \n\n– Maureen Groppe\n\nEven if you can find an antibody test, it may not tell you much\nFrom coast to coast, epidemiologists are using some of the many antibody tests that have entered the market recently to determine how much COVID-19 has spread.  The importance of these tests are not lost on Americans, who are itching to go back to work, see loved ones and find out if they have been infected with the virus. With little public data about the tests\' accuracy, experts question whether the tests will give people false reassurances by indicating they have immunity to the disease.\n\n\"There is currently no evidence that people who have recovered from COVID-19 and have antibodies are protected from a second infection,\" the World Health Organization said in a statement Friday. The tests also \"need further validation to determine their accuracy and reliability,\" the statement said.\n\n– Adrianna Rodriguez and Grace Hauck\n\nDeath certificates can\'t be trusted\nAs the U.S. struggles to track coronavirus fatalities amid spotty testing, delayed lab results and inconsistent reporting standards, a more insidious problem could thwart its quest for an accurate death toll. Up to 1 in 3 death certificates nationwide were already wrong before COVID-19, said Bob Anderson, chief of the mortality statistics branch at the National Center for Health Statistics. Experts say the inaccuracies are part and parcel of a patchwork, state-by-state system of medical examiners, coroners and doctors who have disparate medical backgrounds, and in some cases none at all. \n\n“I’m always worried about getting good data. I think this sort of thing can be an issue even in a pandemic,” Anderson said.\n\n– Jessica Priest\n\nUSNS Comfort wraps up New York City mission\nThe USNS Comfort, docked at a Manhattan pier since March 30, will soon leave for its home port in Norfolk, Virginia, Pentagon spokesman Jonathan Hoffman said. The 1,000-bed hospital ship, sent by President Trump at the request of Gov. Andrew Cuomo, treated just 182 patients. There was one patient left on the ship early Sunday. The ship was deployed to care for patients without the coronavirus, but the Comfort shifted gears when there was little demand for non-COVID patients while the city’s hospitals became overrun with people suffering from the disease. \n\nThis article originally appeared on USA TODAY: Coronavirus live updates: U.S. reaches \'plateau,\' nears 1 million cases; last patient leaves hospital in Wuhan\n\n\nshare on facebook\n\nshare on twitter\n\nshare on whatsapp\nshare via email\n\nshare on linkedin\n\nMicrosoft may earn an Affiliate Commission if you purchase something through recommended links in this article.\n\n\nSmall-business loans\nThe Paycheck Protection Program was created under a $2.2 trillion package that President Donald Trump signed into law in late March to help Americans recover from the economic fallout of the coronavirus pandemic. That bill allocated nearly $350 billion for the program, which provides low-interest loans to small businesses. The program proved so popular that it quickly ran out of money and was forced to shut down last week.\n\nThe latest legislation would provide more than $320 billion to replenish the program and get it running again.\n\n', '2020-04-24 07:22:29.000000', '2020-04-27 08:02:12.000000', 'Staff Blog 1 - edited', 5),
(3, 'edited edited At that rate, U.S. deaths will reach 50,000 no later than Friday.\n\nThe total number of U.S. cases was approaching 860,000 with many states yet to report on Thursday.\n\nU.S. cases rose by over 30,000 on Wednesday, the biggest increase in five days but in line with an average of 30,000 new cases a day in April, according to a Reuters tally.\n\nAcross the country, state officials say there remain bottlenecks in testing capacity, shortages of materials such as swabs used for taking samples and not enough workers to contact- trace infections.\n\nTrump\'s focus on his base complicates path to reelection\nWASHINGTON (AP) — During times of war and strife, national leaders often aim to unite a broken country and, in the process, broaden their appeal beyond their most loyal supporters. Not President Donald Trump.\n\nFILE - In this Feb. 28, 2020, file photo President Donald Trump speak at a campaign rally in North Charleston, S.C. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Jacquelyn Martin, File)© Provided by Associated Press FILE - In this Feb. 28, 2020, file photo President Donald Trump speak at a campaign rally in North Charleston, S.C. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Jacquelyn Martin, File)\nConfronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base.\n\nWhile the coronavirus has claimed the lives of more than 54,000 Americans, eliminated more than 20 million jobs and dashed the routines of daily life for nearly everyone, Trump has leveled attacks on Democrats. He\'s blamed former President Barack Obama\'s team for his own administration\'s failures, picked fights with reporters and thrown rhetorical bombs meant to thrill his hardcore supporters.\n\nFILE - In this April 21, 2020, file photo a man holds a President Donald Trump campaign sign while attending a rally to protests stay-at-home orders put into place due to the COVID-19 outbreak outside the Missouri Capitol in Jefferson City, Mo. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Jeff Roberson, File)© Provided by Associated Press FILE - In this April 21, 2020, file photo a man holds a President Donald Trump campaign sign while attending a rally to protests stay-at-home orders put into place due to the COVID-19 outbreak outside the Missouri Capitol in Jefferson City, Mo. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Jeff Roberson, File)\nDuring a particularly rough stretch last week, Trump pledged to bar foreigners from entering the country. The executive order Trump ultimately signed was less severe than he suggested, but still gave him a chance to highlight action on an issue that\'s central to his political brand.\n\nFour years after Trump captured the White House by perfectly threading narrow victories in critical battleground states, he is betting that a relentless focus on his base will yield a repeat performance. It\'s a risky strategy because Trump\'s standing in some of those states shows signs of weakening. And there\'s little evidence to suggest he has significantly broadened his appeal in other places to offset those vulnerabilities.\n\nFILE - In this March 2, 2020, file photo President Donald Trump speaks during a campaign rally at Bojangles Coliseum in Charlotte, N.C. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Evan Vucci, File)© Provided by Associated Press FILE - In this March 2, 2020, file photo President Donald Trump speaks during a campaign rally at Bojangles Coliseum in Charlotte, N.C. Confronting a pandemic that has upended his presidency and threatened his reelection prospects, Trump has focused almost exclusively on tending to his base. (AP Photo/Evan Vucci, File)\nThe pandemic hasn\'t changed that.\n\n“It drives me crazy, frankly, because part of being the president is to rise above, to ignore certain things,” said Ari Fleischer, who served as White House press secretary under President George W. Bush, whose lukewarm approval ratings soared after his handling of the Sept. 11 attacks. “And I think at a time like this he should leave a lot of the gauntlets on the ground and rise above. But that’s not him.”\n\nFleischer said that, while the virus puts limits on the president\'s ability to travel and the political environment is far more polarized today than it was in the early 2000s, Trump\'s White House could be appealing to the country as a whole with events honoring doctors, nurses and front-line workers that “send helpful, meaningful signals that we are one nation and we can play a meaningful part.\"\n\nOther modern presidents have looked to transcend partisan boundaries at a time of crisis or tragedy, including Bill Clinton in the aftermath of the Oklahoma City bombing, Ronald Reagan after the Challenger space shuttle explosion and Lyndon Johnson after John F. Kennedy\'s assassination.\n\n“I\'m surprised the administration isn’t doing this as well,\" Fleischer said.\n\nOther Republicans, however, believe Trump is playing it right. Stephen Bannon, the president\'s former chief strategist, believes 2020 is a “base election” year and thinks Trump can broaden his support because of a “new nationalism” born in the wake of a pandemic that began in China. He predicted Americans would rally around their president during a period of crisis.\n\n“Trump is a wartime president,” Bannon said.\n\nTrump\'s approval rating has remained remarkably steady over the course of his presidency, with about 42% of poll respondents saying they approve of the job he\'s doing as president, according to a new The Associated Press-NORC Center for Public Affairs Research. That\'s even as many question the veracity of his statements and believe he is not listening to health experts enough during the crisis.\n\nBut the coronavirus has threatened to rewrite the Electoral College map and Trump’s campaign has become concerned about losing support in several key swing states, particularly Florida and Wisconsin. Some advisers have all but written off Michigan, which Trump captured in 2016 by fewer than 11,000 votes. He is now locked in a feud with the state\'s Democratic governor.\n\nIn former Vice President Joe Biden, Trump faces a presumptive Democratic nominee whose promises of across-the-aisle outreach and pragmatic, experienced-based management may play well in several battlegrounds states at a time of crisis. That includes Arizona, which has a vast suburban population uneasy with the constant Trump drama, tweets and base plays.\n\n“People are going to look for stability,” said Doug Cole, a veteran Republican operative in Arizona who worked on John McCain’s 2008 presidential campaign. “Biden can capitalize on that.”\n\nTrump campaign officials who requested anonymity to describe campaign strategy stressed that the election is still six months away, an eternity in politics. They noted polls can be be wrong or change, especially if the pandemic wanes or the economy rebounds. And they said the campaign believes that voters will credit Trump for the strong economy before the pandemic hit, even as they have expressed worry that he could be pushing to open things too quickly and that any resulting deaths will not be forgiven by voters in November.\n\nBut there are warning signs. Several Republicans who mimicked Trump\'s 2016 strategy by focusing on immigration failed to win congressional or governors\' races.\n\n“Whatever impact it has in boosting turnout among core supporters, it boosts the backlash vote even more,” said Frank Sharry, the executive director of the liberal immigration advocacy group America\'s Voice.\n\nHe noted the 2017 Virginia’s governor’s race, in which GOP nominee Ed Gillespie tried to feather candidate Ralph Northam with ads on immigration. The strategy backfired, as it did in many 2018 midterm races.\n\nJason Miller, who served as communications director for Trump\'s 2016 campaign, countered that last week\'s immigration executive order may appeal to the base. But he said it was also aimed at helping African Americans, Hispanics, women and immigrants already in the U.S. legally who typically hold lower-wage jobs at a higher percentage than those is what is typically viewed as the president\'s base.\n\nTrump\'s campaign has been trying to chip away at Democrats\' advantage with those demographic groups, even as advocates counter that minority immigrants will suffer by being prevented from having their parents and other family members join them in the country.\n\nMiller also defended the president\'s refusal to put petty political riffs aside at a time of national crisis, arguing that some fights are worth picking and that Trump will be judged, not on his daily briefings, but on how the country eventually recovers from the crisis.\n\n“He is bringing the country together with determinative action and results,\" he said.\n\n___\n\nLemire reported from New York. Associated Press writer Nicholas Riccardi in Denver contributed to this report.\n\nFollow Colvin and Lemire on Twtter at https://twitter.com/colvinj and https://twitter.com/JonLemire\n\n\n', '2020-04-24 08:44:41.000000', '2020-04-27 08:00:37.000000', 'student blog edited edited ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `creation_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `id` bigint(20) NOT NULL,
  `creation_time` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_time` datetime(6) DEFAULT NULL,
  `modified_time` datetime(6) DEFAULT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`id`, `creation_time`, `description`, `end_time`, `modified_time`, `start_time`, `title`, `type`) VALUES
(31, '2020-04-27 00:53:02.000000', 'Test Meeting Create', '2020-04-20 17:45:00.000000', NULL, '2020-04-20 17:15:00.000000', 'Test Meeting Create', 'Virtual'),
(32, '2020-04-27 07:55:44.000000', 'After Day', '2020-04-30 06:15:00.000000', NULL, '2020-04-30 00:30:00.000000', 'After Day', 'Real'),
(33, '2020-04-27 07:56:21.000000', 'Same Day', '2020-04-29 17:15:00.000000', NULL, '2020-04-29 17:00:00.000000', 'Same Day', 'Virtual');

-- --------------------------------------------------------

--
-- Table structure for table `meetings_students`
--

CREATE TABLE `meetings_students` (
  `student_id` bigint(20) NOT NULL,
  `meeting_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings_students`
--

INSERT INTO `meetings_students` (`student_id`, `meeting_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(24, 2),
(25, 1),
(25, 2),
(26, 1),
(26, 2),
(26, 3),
(27, 1),
(28, 1),
(28, 2),
(28, 3),
(29, 1),
(31, 1),
(31, 2),
(31, 3),
(31, 4),
(32, 1),
(33, 1),
(33, 2);

-- --------------------------------------------------------

--
-- Table structure for table `meetings_tutors`
--

CREATE TABLE `meetings_tutors` (
  `tutor_id` bigint(20) NOT NULL,
  `meeting_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meetings_tutors`
--

INSERT INTO `meetings_tutors` (`tutor_id`, `meeting_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(24, 2),
(25, 1),
(25, 2),
(26, 1),
(27, 1),
(27, 2),
(28, 1),
(28, 2),
(29, 1),
(31, 1),
(32, 1),
(33, 1);

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` bigint(20) NOT NULL,
  `content` varchar(255) DEFAULT NULL,
  `time` datetime(6) DEFAULT NULL,
  `receiver_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `content`, `time`, `receiver_id`, `sender_id`) VALUES
(9, 'Hi tutor, it is student', '2020-04-27 00:45:56.000000', 3, 2),
(10, 'Hi student, it is tutor', '2020-04-27 00:46:07.000000', 2, 3),
(11, 'Hi student1, it is tutor, new chat', '2020-04-27 00:46:48.000000', 4, 3),
(12, 'hi tutor, it is student 1', '2020-04-27 00:47:09.000000', 3, 4),
(15, 'hello, it is student 2', '2020-03-24 01:53:34.000000', 3, 8),
(16, 'hello, it is student 3', '2020-04-19 01:53:54.000000', 6, 7);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL,
  `role_desc` varchar(255) DEFAULT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `role_desc`, `role_name`) VALUES
(1, 'admin', 'admin'),
(2, 'staff', 'staff'),
(3, 'tutor', 'tutor'),
(4, 'student', 'student');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`) VALUES
(1, 'Allocate Room 1'),
(3, 'Allocate Room 2');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `user_id`) VALUES
(1, 2),
(2, 4),
(3, 7),
(4, 8),
(5, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tutor`
--

CREATE TABLE `tutor` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tutor`
--

INSERT INTO `tutor` (`id`, `user_id`) VALUES
(1, 3),
(2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` smallint(6) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `gender` smallint(6) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `enabled`, `fullname`, `gender`, `password`, `username`, `role_id`) VALUES
(1, 'vinhnqtcs19023@fpt.edu.vn', 1, 'Nguyen Quang Vinh', 1, '111', 'admin', 1),
(2, 'trunglttcs18007@fpt.edu.vn', 1, 'Le Thanh Trung', 1, '111', 'student', 4),
(3, 'hieudvtcs19022@fpt.edu.vn', 1, 'Dao Van Hieu', 1, '111', 'tutor', 3),
(4, 'ThongLTTCS19010@fpt.edu.vn', 1, 'Lu Thua Thong', 1, '111', 'student1', 4),
(5, 'phonglhtcs19002@fpt.edu.vn', 1, 'Le Hong Phong', 1, '111', 'staff', 2),
(6, 'HueDTLTCS18010@fpt.edu.vn', 1, 'Dinh Thi Lan Hue', 2, '111', 'tutor2', 3),
(7, 'phonglhtcs19002@fpt.edu.vn', 1, 'Message 7 Days', 1, '111', 'student3', 4),
(8, 'phonglhtcs19002@fpt.edu.vn', 1, 'Message 28 Days', 1, '111', 'student2', 4),
(9, 'phonglhtcs19002@fpt.edu.vn', 1, 'No turtor Student', 1, '111', 'student4', 4),
(10, 'phonglhtcs19002@fpt.edu.vn	', 1, 'No turtor Student	1', 0, '111', 'student5', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `allocation`
--
ALTER TABLE `allocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK56da8n7lqj46grfh9hqi10dcj` (`room_id`),
  ADD KEY `FKp86noct2101ypm24ndph671ar` (`student_id`),
  ADD KEY `FKa86kud621iw198xedtptc1pj8` (`tutor_id`);

--
-- Indexes for table `blog_comment`
--
ALTER TABLE `blog_comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKexc25jcxcor1jb4lfcgyoguei` (`blog_post_id`),
  ADD KEY `FKsf6dq50mwtekinwpvoicf9rpj` (`user_id`);

--
-- Indexes for table `blog_post`
--
ALTER TABLE `blog_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7vg0q5xiixc6i1m14dx0h5n49` (`user_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6s7fu4q654xgy4gdlv8p7uplo` (`owner_id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings_students`
--
ALTER TABLE `meetings_students`
  ADD PRIMARY KEY (`student_id`,`meeting_id`),
  ADD KEY `FK3jwb67q3ltsjpomigoru0tyqi` (`meeting_id`);

--
-- Indexes for table `meetings_tutors`
--
ALTER TABLE `meetings_tutors`
  ADD PRIMARY KEY (`tutor_id`,`meeting_id`),
  ADD KEY `FKe79mk6f6uwaj7rnhyf2wxqegw` (`meeting_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK86f0kc2mt26ifwupnivu6v8oa` (`receiver_id`),
  ADD KEY `FKcnj2qaf5yc36v2f90jw2ipl9b` (`sender_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKk5m148xqefonqw7bgnpm0snwj` (`user_id`);

--
-- Indexes for table `tutor`
--
ALTER TABLE `tutor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK4bpotihp1nbteoo09flh9p4ur` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `allocation`
--
ALTER TABLE `allocation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `blog_comment`
--
ALTER TABLE `blog_comment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `blog_post`
--
ALTER TABLE `blog_post`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tutor`
--
ALTER TABLE `tutor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `allocation`
--
ALTER TABLE `allocation`
  ADD CONSTRAINT `FK56da8n7lqj46grfh9hqi10dcj` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`),
  ADD CONSTRAINT `FKa86kud621iw198xedtptc1pj8` FOREIGN KEY (`tutor_id`) REFERENCES `tutor` (`id`),
  ADD CONSTRAINT `FKp86noct2101ypm24ndph671ar` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`);

--
-- Constraints for table `blog_comment`
--
ALTER TABLE `blog_comment`
  ADD CONSTRAINT `FKexc25jcxcor1jb4lfcgyoguei` FOREIGN KEY (`blog_post_id`) REFERENCES `blog_post` (`id`),
  ADD CONSTRAINT `FKsf6dq50mwtekinwpvoicf9rpj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `blog_post`
--
ALTER TABLE `blog_post`
  ADD CONSTRAINT `FK7vg0q5xiixc6i1m14dx0h5n49` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `FK6s7fu4q654xgy4gdlv8p7uplo` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `meetings_students`
--
ALTER TABLE `meetings_students`
  ADD CONSTRAINT `FK3jwb67q3ltsjpomigoru0tyqi` FOREIGN KEY (`meeting_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `FKnflxu0b6c9u293tunpfukyala` FOREIGN KEY (`student_id`) REFERENCES `meeting` (`id`);

--
-- Constraints for table `meetings_tutors`
--
ALTER TABLE `meetings_tutors`
  ADD CONSTRAINT `FKe79mk6f6uwaj7rnhyf2wxqegw` FOREIGN KEY (`meeting_id`) REFERENCES `tutor` (`id`),
  ADD CONSTRAINT `FKiajnursymb2ff1j7bkanq26pn` FOREIGN KEY (`tutor_id`) REFERENCES `meeting` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `FK86f0kc2mt26ifwupnivu6v8oa` FOREIGN KEY (`receiver_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKcnj2qaf5yc36v2f90jw2ipl9b` FOREIGN KEY (`sender_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `FKk5m148xqefonqw7bgnpm0snwj` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `tutor`
--
ALTER TABLE `tutor`
  ADD CONSTRAINT `FK4bpotihp1nbteoo09flh9p4ur` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
