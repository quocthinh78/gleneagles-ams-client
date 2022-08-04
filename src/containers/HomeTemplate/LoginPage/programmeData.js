import { Fragment } from "react";

import moderator1 from "../../../assets/images/5.png";
import moderator2 from "../../../assets/images/6.png";
import moderator3 from "../../../assets/images/5.png";
import moderator4 from "../../../assets/images/11.png";

import speaker01 from "../../../assets/images/1.png";
import speaker02 from "../../../assets/images/2.png";
import speaker03 from "../../../assets/images/3.png";
import speaker04 from "../../../assets/images/4.png";
import speaker05 from "../../../assets/images/7.png";
import speaker06 from "../../../assets/images/8.png";
import speaker07 from "../../../assets/images/9.png";
import speaker08 from "../../../assets/images/10.png";

function createData(title, speaker, details) {
  return { title, speaker, details };
}

export const session1 = [
  createData(
    "Personalised and Chemotherapy Free Treatment in Chronic Lymphocytic Leukaemia (CLL)",
    {
      img: speaker01,
      name: "Dr Lee Yuh Shan",
      position: "Haematologist",
      grad: (
        <Fragment>
          MBBS (Malaya),
          <br />
          MRCP (United Kingdom),
          <br />
          FRCPath (United Kingdom),
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Lee Yuh Shan is a haematologist at Parkway Cancer Centre. His area of expertise is
          in Haematology such as lymphoma, myeloma and haematopoietic stem cells transplant.
          <br />
          <br />
          Dr Lee received his basic medical degree from University of Malaya in 2003 and Membership of The Royal College
          of Physician (MRCP) in 2007. He completed his haematology training at Singapore General Hospital (SGH) in 2011
          and subsequently obtained his Fellowship of the Royal College of Pathologists (FRCPath), United Kingdom in 2013.
          Dr Lee worked for ten years in SGH and received Gold and Star awards in 2013 and 2017 respectively,
          under Singapore Health Quality Service Awards. He was the director of lymphoma service in Department of Haematology,
          SGH from 2017 and lymphoma lead in SingHealth Duke Blood Cancer Centre (SDBCC) from 2018. He is active in collaborative works
          locally under the SDBCC and Singapore Lymphoma Working Group; as well as regionally for Chronic Lymphocytic Leukemia (CLL).
          <br />
          <br />
          Dr Lee is a member of SingHealth Institutional Review Board (IRB) and sat on several pharmaceutical advisory boards.
          Dr Lee was awarded Health Manpower Development Programme (HMDP) fund in 2013 under Ministry of Health to further
          develop his specialty in lymphoma at National Institutes of Health (NIH), Maryland, United States. During this period,
          he had first-hand experience on seeing patients under clinical trial with new oral therapy in the treatment of chronic
          lymphocytic leukemia (CLL) as well as on aggressive lymphoma. It is also during this period that he developed his skills
          in the new treatment approach for Primary Central Nervous System Lymphoma (PCNSL). After his return from HMDP,
          he contributed to the development and incorporation of new agents in the treatment of lymphoma,
          as well as on the development of investigator-initiated trials for aggressive lymphoma in the Department of Haematology,
          SGH.
          <br />
          <br />
          Dr Lee is involved in many pharmaceutical sponsored trials and investigator-initiated trials. He has published in many
          peer-reviewed journals and is a reviewer for peer-reviewed journal. Dr Lee is active in undergraduate medical training
          and is a senior clinical tutor for Yong Loo Lin School of Medicine and Adjunct Associate Professor for Duke NUS School
          of Medicine. He is also a faculty member of the senior residency program in haematology, SGH. He contributes to lymphoma
          support group and Singapore World Lymphoma Day.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          CLL is a one of the most common leukaemia in the Western world but is under recognised in this part of the world.
          CLL is usually asymptomatic and is suspected during routine medical examination with presence of high white cells
          count. Patients can also present with enlarged lymph nodes as initial presentation. Diagnosis of CLL can be made
          with simple diagnostic tool such as flow cytometry. Further in-depth analysis can help to prognosticate and guide
          personalised treatment approach for each individual patient. In the past decade, treatment for CLL underwent
          revolutionary changes and chemotherapy free as well as personalised treatment is a reality now.
          <br />
          <br />
          The talk will focus on the paradigm treatment changes in CLL with new targeted oral therapies as well as more effective
          immunotherapy. This approach has been shown to be as effective and better than the traditional chemotherapy
          approach in high-risk patients. This approach made treatment for CLL feasible for elderly patients and patients
          with relapsed CLL.  The journey for the treatment of CLL continues with new aim of deeper response using finite
          treatment as well as using cell therapy for high risk CLL.
        </Fragment>
      ),
    }
  ),
  createData(
    "Utility of the Comprehensive Geriatric Assessment (CGA) and Predictive Tools in Older Adults with Cancer",
    {
      img: speaker02,
      name: "Dr Angela Pang",
      position: "Medical Oncologist",
      grad: (
        <Fragment>
          MBBS (S’pore),
          <br />
          Grad Dip (GRM),
          <br />
          MRCP (UK),
          <br />
          MCI (Singapore),
          <br />
          M Med (Internal Med)
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Angela Pang is a medical oncologist at Gleneagles Hospital.  She had obtained her undergraduate degree from the School of Medicine, National University of Singapore (NUS) in 2005 ; and her postgraduate qualifications – Masters in Medicine (Internal Medicine) from NUS, and her Membership of the Royal College of Physicians (UK) in 2009.
          <br />
          <br />
          Having completed her advanced specialist training in Medical Oncology in the National University Hospital (NUH), she was awarded the NCIS research scholarship for her Sarcoma research fellowship with Professor Robert G Maki in the Tisch Cancer Institute, Mount Sinai Hospital, New York.
          <br />
          <br />
          With a specific interest in the optimisation of care in elderly cancer patients, Dr Pang further pursued a Graduate Diploma in Geriatric Medicine with the Yong Loo Lin School of Medicine (YLLSOM). In order to integrate her expertise in both geriatrics and oncology, she also trained in Geriatric Oncology with Dr Beatriz Korc and Dr Stuart Lichtman in the Memorial Sloan Kettering Cancer Center, New York.
          <br />
          <br />
          Dr Pang’s main clinical interests are in gastrointestinal cancers, bone/soft tissue sarcomas and Geriatric Oncology.  She was the director of the Geriatric Oncology program both in NUH and NTFGH; and co-lead for the Musculoskeletal Oncology team in the National University Cancer Institute, Singapore.
          <br />
          <br />
          Supported by the Jurong Health Fund grant, she spearheaded the setting up of the multi-disciplinary Geriatric Oncology Longitudinal End to eNd (GOLDEN) program both in NUH and NTFGH in collaboration with surgeons, geriatricians and allied health professionals.
          <br />
          <br />
          The GOLDEN program provides surgical pre-habilitation for older adults going for cancer surgery, and comprehensive geriatric assessment to tailor cancer treatment for elderly patients planned for chemotherapy or radiation therapy.
          <br />
          <br />
          She was also a principal investigator for several international multi-centre cancer clinical trials and also a recipient of several grants. Her research work has been published in peer reviewed journals including the Journal of Clinical Oncology (JCO), Journal of American Society of Medicine (JAMA) Oncology, Nature Communications, Clinical Cancer Research and Journal of Geriatric Oncology.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          Cancer is primarily a disease of older adults. The aging population, coupled with the fact that the risk
          of developing cancer increases with age, predicts an exponential rise in cases of older adults
          diagnosed with cancer. Singapore is in a similar predicament with the number of working adults
          supporting the older population decreasing from 5 young adults to 1 today, to 2 young adults for 1
          older adult by 2030. Correspondingly, the incidence of cancer in adults aged > 65 is expected to rise
          from 121,000 in 2020 to 349,000 in 2040.
          <br />
          <br />
          Given that the provision of care for older adults with cancer presents the unique challenge of requiring
          expertise in both oncologic and geriatric issues, most cancer programs are still lacking in terms of
          meeting the complex needs of these patients. Consequently, in recent years, there has been an
          increasing urgency to address that through training and subsequently, the introduction of dedicated
          geriatric oncologic models of care delivery.
          <br />
          <br />
          The comprehensive geriatric assessment (CGA) is a tool that helps ascertain the physiological age of
          older individuals, is the gold standard for assessing older adults with cancer.
          <br />
          <br />
          The American Society of Clinical Oncology (ASCO), International Society of Geriatric Oncology (SIOG)
          and National Comprehensive Cancer Network (NCCN) recommend using the geriatric assessment
          domains to identify unrecognized health problems that can interfere with treatment and predict
          adverse health-related outcomes, aiding the complex treatment decision making process by the
          treating physician and patient.
          <br />
          <br />
          More recently, it has been shown that geriatric assessment-guided interventions improve one’s
          quality of life and mitigate treatment toxicity without compromising survival. Today, I will discuss the
          role of CGA in cancer care for older adults and provide some useful information to assess potential
          treatment risks and benefits, anticipate complications, and plan interventions to better care for older
          adults with cancer.
          <br />
          <br />
          The clinical course of COVID-19 is often accompanied by a hyperinflammatory response and systemic
          coagulation derangement, which may evolve into overt disseminated intravascular coagulopathy and
          increase the risk of venous thromboembolism (VTE). In this short talk, I would share with you the
          incidence of VTE, the underlying pathophysiology and the current recommendation for management
          and prevention of VTE in COVID-19 patients.
        </Fragment>
      ),
    }
  ),
  createData(
    "How to Diagnose and Manage Angina Without Obstructive Coronary Artery Disease",
    {
      img: speaker03,
      name: "Dr Saurabh Rastogi",
      position: "Cardiologist",
      grad: (
        <Fragment>
          MBBS (Delhi, India), FACC, FSCAI,
          <br />
          American Board Certified (Interventional Cardiology),
          <br />
          American Board Certified (Internal Medicine),
          <br />
          Diplomate Certification Board of Nuclear Cardiology (USA)
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Saurabh Rastogi is a cardiologist at Gleneagles Hospital.  His subspecialty is in interventional cardiology for the treatment of coronary artery disease. He has practised medicine for more than 15 years. His clinical expertise includes complex coronary angioplasty/stenting, intracoronary imaging and hemodynamic assessment, and advanced heart failure management. Prior to joining Gleneagles, Dr Rastogi practised at Ng Teng Fong General Hospital and was the former Director of the Cardiac Catheterization Laboratory.
          <br />
          <br />
          Dr Rastogi graduated from Maulana Azad Medical College, New Delhi, India and then pursued his post-graduate training at the University of Texas Medical Branch and Methodist DeBakey Heart & Vascular Centre, Texas, USA. Prior to moving to Singapore, he practised at Harrison Medical Centre in greater Seattle area, USA, as a consultant in interventional cardiology and heart failure.
          <br />
          <br />
          He is board-certified by the American Board of Internal Medicine (ABIM) in interventional cardiology, cardiovascular medicine, advanced heart failure, and transplant and internal medicine. He is also board-certified in nuclear cardiology by the American Society of Nuclear Cardiology and in adult comprehensive echocardiography by the American Society of Echocardiography.
          <br />
          <br />
          He is a Fellow of the American College of Cardiology (FACC), Society for Cardiovascular Angiography and Interventions (FSCAI), and Asian Pacific Society of Interventional Cardiology. He is also a member of the Singapore Cardiac Society.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          Patients with symptoms and/or signs of ischaemia but no obstructive coronary artery disease (INOCA) present a diagnostic and therapeutic challenge. Up to half of all angina patients undergoing elective coronary angiography have no obstructive epicardial coronary artery. Microvascular and/or vasospastic angina are the two most common causes of INOCA; however, invasive coronary angiography lacks the sensitivity to diagnose these functional coronary disorders. The burden of these conditions on physical and mental wellbeing can be profound. They are associated with morbidity and a reduction in quality of life.
          <br />
          <br />
          We will discuss novel invasive testing for diagnosis of microvascular and vasospastic angina in the absence obstructive coronary disease. Identification of these distinct disorders is key for stratifying INOCA patients, allowing prognostic insights and better patient care with linked therapy based on contemporary guidelines.
          <br />
          <br />
          This talk aims to highlight the salient points in the assessment and management of this common
          condition.
        </Fragment>
      ),
    }
  ),
  createData(
    "Cytokine Inhibition, Beyond the Anti TNFs - Dousing the Fire of Inflammation",
    {
      img: speaker04,
      name: "Dr Anita Lim",
      position: "Rheumatologist",
      grad: (
        <Fragment>
          MB ChB (U of Glasgow, United Kingdom),
          <br />
          MRCP (UK) (RCP, United Kingdom)
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Anita Lim is a rheumatologist at Gleneagles Hospital. She obtained her medical degree from the University of Glasgow under the auspices of a Brunei Government scholarship. She trained in Internal Medicine and Paediatrics in Brunei before embarking on specialist training in rheumatology at the Addenbrooke’s Hospital, Cambridge and the Norfolk and Norwich University Hospital, United Kingdom. Her interests span the inflammatory arthritides to the connective tissue diseases and transition care in rheumatology for adolescents, quality improvement, ethics and professionalism. She joined the National University Hospital, Singapore in 2005 while the division of Rheumatology was in its infancy, before moving to join A/Prof Leong Keng Hong’s rheumatology practice in April 2022. She was Principal Investigator on the Future 1 clinical trial on Secukinumab in PsA and Risankuzimab in PsA in NUH.
          <br />
          <br />
          In addition to clinical work, she served in the National University Hospital administration for a decade in Medical Affairs Human Resource and Education. She is on the National Rheumatology Exit Exam committee and teaches ethics to undergraduates and postgraduates in medicine and nursing and served on the National University Hospital Ethics Committee.
          <br />
          <br />
          She continues to highlight the importance of interprofessional collaborative practice in NUS CBmE as adjunct staff and explores the use of narratives in drawing out the humanistic side of caring in the healthcare professions.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          The common rheumatic diseases like rheumatoid arthritis, ankylosing spondylitis and psoriatic arthritis are feared because of pain, physical disability and impact on quality of life. Clinical remission has become a realistic therapeutic goal for many patients with these types of inflammatory arthritis because of the advent of biological treatments 2 decades ago. However, a third of patients are refractory to anti-TNF (Tumour Necrosis Factor) drugs. Newer effective options targeting cytokine inhibition at different steps of the cytokine network modulate the immune system. IL6 (Interleukin 6) receptor blockade, B cell depletion, and inhibition of IL17, IL23, and JAK (Janus kinase) are some of the mechanisms of action of new treatments which have improved our understanding of the pathophysiology of the arthritides and set the stage for precision medicine. This talk will touch on the different drugs available in the rheumatologists’ armamentarium.
        </Fragment>
      ),
    }
  ),
];

export const discussion1 = [
  {
    img: moderator1,
    name: "Dr Amitabh Monga,",
    position: "Gastroenterologist",
    grad: (
      <Fragment>
        MBBS,
        <br />
        MD (Internal Medicine),
        <br />
        MRCP (UK),
        <br />
        FAMS (Gastroenterology),
        <br />
        FRCP- Edinburgh
      </Fragment>
    ),
  },
  {
    img: moderator2,
    name: "Dr Richard Quek,",
    position: "Medical Oncologist",
    grad: (
      <Fragment>
        MBBS (Singapore),
        <br />
        MRCP (United Kingdom),
        <br />
        FAMS (Medical Oncology)
      </Fragment>
    ),
  },
];

export const session2 = [
  createData(
    "Updates in Cataract Surgery – Where we are in the 2020s?",
    {
      img: speaker05,
      name: "Dr Don Pek",
      position: "Ophthalmologist",
      grad: (
        <Fragment>
          BSc (medsci) Hons,
          <br />
          MB ChB (U of Glasgow, United Kingdom),
          <br />
          M Med (Ophth) (NUS, Singapore),
          <br />
          FAMS (S'pore), FRCSEd
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Don Pek is an ophthalmologist at Gleneagles Hospital with more than 10 years experience in refractive cataract surgery, complex cataracts and anterior segment reconstruction.
          <br />
          <br />
          He started his medical training in Glasgow medical school, Scotland and returned to Singapore to complete his training in Ophthalmology before being awarded a Health Manpower Development Plan (HMDP) to be awarded a clinical fellowship at McMaster's University (Canada) for skills such as anterior segment reconstruction and iris repair, complex cataract surgery, management of artificial intraocular lens (IOL) complications and minimally invasive glaucoma surgery (MIGS).
          <br />
          <br />
          Dr Pek was awarded the Healthcare Humanities Award 2011, from the Courage Fund, National Healthcare Group (NHG), for his work with Global clinic. He has also received "Best project in category" awards from the NHG Clinical Practice Improvement Programme (CPIP) in 2019 and 2021 for Transforming Hindrances into Opportunities and Resources (THOR) for transforming patient health care provision, optimising cataract workflows and maximising utility of surgical theatres. He is a Clinical Teacher for Lee Kong Chian School of Medicine and a clinical tutor for the Singapore Polytechnic-Optom program.  He is a fellow of the Royal college of Ophthalmologists in Edinburgh (UK) and serves in the Young Ophthalmologists (YO) chapter for the Singapore Society of Ophthalmologists (SSO) and regularly volunteers with Global Clinic to deliver free eye care to countries such as India, Myanmar, Cambodia, Indonesia and Thailand.
          <br />
          <br />
          He regularly teaches at the AAO surgical wetlab skills transfer for Scleral Fixation Intraocular Lens techniques and has been invited to speak in his expertise in the use of i-Stent, Mi-Loop, Complex cataract surgeries, optimising public cataract services and his humanitarian work.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          Focus of the talk:
          <ul>
            <li>New surgical devices - miLoop, MIGS</li>
            <li>Updates in anterior segment surgical techniques - sutureless scleral fixation, artificial iris</li>
            <li>New intraocular implants - trifocals and EDOF lenses</li>
          </ul>
          This talk aims introduce the non-ophthalmologists to recent innovations which improve surgical outcomes and to explain some of the science behind the new types of intraocular implants available.  We will discuss how new devices such as the miLoop makes dense cataract surgeries safe and minimally-invasive glaucoma surgery devices such as the iStent and the Hydrus reduce the risk of traditional glaucoma surgeries such as trabeculectomy.
          <br />
          <br />
          Updates in surgical techniques such as the intrascleral fixation of lenses allows for better visual outcomes in patients with aphakia compared with older anterior chamber intraocular lenses.
          <br />
          <br />
          We will also discuss newer optical designs such as the extended depth of focus lenses and share how they can be used to meet the visual requirements for many patients.
          <br />
          <br />
          With these new technologies, we are better positioned to meet patient expectations and deliver a quality of vision suited to their visual needs.
        </Fragment>
      ),
    }
  ),
  createData(
    "Embolotherapy – New Approaches to Old Diseases",
    {
      img: speaker06,
      name: "Dr Benjamin Chua",
      position: "General Surgeon",
      grad:
        <Fragment>
          MBBS (Singapore), <br />
          MHSc (Clin Research, Duke University, United States), <br />
          FRCSEd (General Surgery), <br />
          Fellowship In Advanced Vascular Surgery (Melbourne, Australia), <br />FAMS
        </Fragment>
    },
    {
      profile: (
        <Fragment>
          Dr Benjamin Chua is a vascular and endovascular surgeon practising at Gleneagles Hospital. He specialises in treating and managing all vascular conditions such as aortic aneurysms, peripheral arterial disease, diabetic limb salvage, varicose veins and venous disease, carotid diseases/stroke prevention, renal dialysis access, vascular malformations and chronic wound care.
          <br />
          <br />
          Dr Chua graduated MBBS from the National University of Singapore in 2000. In 2001, he was awarded the prestigious Singapore National Medical Research Council (NMRC) Fellowship Training Award to pursue the Clinical Research Training Programme at Duke University of Medicine in Durham, North Carolina. While at Duke, he also served as a research fellow at the Duke Clinical Research Institute, focusing his research on lower limb peripheral vascular disease in the dialysis dependent populations as well as in the development of randomized trials in surgery. Dr Chua obtained his MHSc in Clinic Research from Duke University in 2003.
          <br />
          <br />
          Regarded as one of the leading vascular surgeons in Asia, Dr Chua travels extensively in the Asia Pacific region to teach and proctor complex aortic stenting, peripheral vascular interventions and endovenous surgery. He is also regularly invited to sit on the faculty and speak at numerous regional and international vascular conferences.
          <br />
          <br />
          Through the Vascular and Interventional Centre, Dr Chua strives to provide the best personalised care and expert specialist management to patients with vascular conditions.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          Embolotherapy or embolization therapy using endovascular techniques has gained momentum in recent years as a viable treatment strategy for disease that may be vascular in pathogenesis.  Common established conditions treated with embolotherapy include vascular malformations and arterial aneurysms.  In recent years, embolotherapy has been used as an alternative or as bridge therapy for conditions in which occlusion of feeding arteries or drainage veins can help treat or significantly improve clinical outcomes. Emerging clinical data have shown the benefits of embolotherapy in conditions such as uterine fibroids, benign prostatic hypertrophy, knee osteoarthritis and erectile dysfunction.  Dr Chua will discuss the application of embolotherapy in various diseases as well as present case studies and clinical outcomes data.
        </Fragment>
      ),
    }
  ),
  createData(
    "Cartilage Regeneration – An Option to Knee Replacement?",
    {
      img: speaker07,
      name: "Dr Tho Kam San",
      position: "Orthopaedic Surgeon",
      grad: (
        <Fragment>
          MBBS (NUS, Singapore), <br />FRCSEd (Gen Surg) (RCS, Edinburgh, United Kingdom),<br />
          M Med (Surg) (NUS, Singapore), <br />FAMS (Orth Surg) (Academy of Medicine, Singapore)
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Tho Kam San is an orthopaedic surgeon at Gleneagles Hospital. He graduated from the National University of Singapore in 1985 and was then admitted as Fellow to the Royal College of Surgeons (Edinburgh) and obtained his Masters of Medicine (Surgery) in 1989. Later, he did the Foreign Medical Graduates Examination (FMGEMS), followed by his Orthopaedic Surgery Exit Certification Examination in 1995, Fellow to the Academy of Medicine Singapore in 1996.
          <br />
          <br />
          Dr Tho is actively involved in the management of professional sportsmen and was team physician to the national soccer team and S-League teams. Treatment of ligament injuries around the knee, ankle and shoulder form a big part of his work. Most injuries can be treated nonsurgically with medications, injections and physiotherapy. Injections of joint lubricant in the knee or ankle joints can help reduce pain and swelling, allowing many sportsmen and soccer players to get back to competition. When required, arthroscopic reconstruction or repair of these ligaments will be done. Common arthroscopic procedures include anterior cruciate ligament reconstruction, posterior cruciate ligament reconstruction, meniscus repair, shoulder joint ligament reconstruction for recurrent dislocation, rotator cuff repair as well as joint debridement of the knee, shoulder, hip and ankle. Total joint replacement and uni-condylar knee replacements as well as shoulder and hip replacement surgeries are done in severely damaged joints in older patients. Dr Tho is also active in various sports organisation and bodies.
          <br />
          <br />
          Dr Tho’s special interests include Sports Orthopaedics and Knee and Hip Replacement.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          To Be Updated
        </Fragment>
      ),
    }
  ),
  createData(
    "Advancing the Care of Prostate Cancer",
    {
      img: speaker08,
      name: "Dr Wong Siew Wei",
      position: "Medical Oncologist",
      grad: (
        <Fragment>
          MBBS (Melbourne),
          <br />
          FRACP
        </Fragment>
      ),
    },
    {
      profile: (
        <Fragment>
          Dr Wong Siew Wei is a medical oncologist at Parkway Cancer Centre. Dr Wong’s areas of expertise and interest are in prostate, kidney, bladder, upper gastrointestinal and lung cancers.
          <br />
          <br />
          Dr Wong graduated from University of Melbourne, Australia (MBBS, BMedSc). He underwent Basic and Advanced Physician Training in medical oncology in Victoria, Australia, culminating in a Fellowship in Royal Australasian College of Physicians (FRACP). Dr Wong holds a Clinical Diploma in Palliative Care awarded by the Victorian Chapter of Palliative Medicine, Australia. Prior to private practice, Dr Wong was a Consultant, Medical Oncologist with Johns Hopkins Singapore International Medical Centre (JHSIMC) and Tan Tock Seng Hospital (TTSH). He was involved in multidisciplinary tumour boards for gastrointestinal, thoracic and genitourinary malignancies during his appointment at JHSIMC / TTSH and led a number of clinical trials in his previous institution. He moved into private practice in 2018. Dr Wong was the Programme Director of the National Healthcare Group Medical Oncology Training Programme. He also served as a member of Tan Tock Seng Hospital’s Drug and Therapeutics Committee.
          <br />
          <br />
          Dr Wong was a clinical teacher at the Lee Kong Chian School of Medicine at Nanyang Technological University. He has lectured at various oncology meetings at both national and regional levels, especially on the topic of genitourinary cancers, and given numerous public talks on cancer awareness.
        </Fragment>
      ),
      abstract: (
        <Fragment>
          Prostate cancer is the second most common cancer in Singaporean men. Incidence of prostate cancer is rising. Prostate specific antigen (PSA) screening for prostate cancer is controversial due to variable natural history, ranging from low-grade indolent cancers that many never manifest clinically to aggressive high-grade cancer that cause early mortality. Locally and regionally, a large proportion of prostate cancer cases are diagnosed in advanced stage.
          <br />
          <br />
          The cornerstone of treatment of advanced prostate cancer is androgen deprivation therapy (ADT). Increasingly, early intensification of treatment by adding novel hormonal agent and/or chemotherapy is being adopted in patients with metastatic castration-sensitive prostate cancer (mCSPC). Invariably, most patients will progress to metastatic castration-resistant prostate cancer (mCRPC).
          <br />
          <br />
          Up to 1 in 5 patients with mCRPC may harbour somatic DNA repair pathway alterations. Poly (ADP-ribose) polymerase (PARP) inhibition has emerged as an important treatment for this cohort of patients who have failed one novel hormonal agent. Data on earlier use of PARP inhibitors in mCRPC will emerge. Testing for DNA repair pathway alterations should be offered to all patients with mCRPC.
        </Fragment>
      ),
    }
  ),
];

export const discussion2 = [
  {
    img: moderator3,
    name: "Dr Amitabh Monga,",
    position: "Gastroenterologist",
    grad: (
      <Fragment>
        MBBS,
        <br />
        MD (Internal Medicine),
        <br />
        MRCP (UK),
        <br />
        FAMS (Gastroenterology),
        <br />
        FRCP- Edinburgh
      </Fragment>
    ),
  },
  {
    img: moderator4,
    name: "Dr Thomas Ho,",
    position: "General Surgeon",
    grad: (
      <Fragment>
        MBBS (U of Sydney, Australia),
        <br />
        MMed (Surg)(NUS, Singapore),
        <br />
        FRCSEd (Gen Surg),
        <br />
        FAMS (General Surgery),
        <br />
        FSSO (USA)
      </Fragment>
    ),
  },
];
