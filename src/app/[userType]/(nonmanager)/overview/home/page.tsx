"use server";

import { getProfCourses, getPrefs, getProfTAs } from '@/actions/professor';
import AddTASubcomponent from '@/Component/adTASubCompoent';

export default async function LandingPage() {

    
    const rows = await getProfCourses();
    const prefs = await getPrefs();
    const rows2 = await getProfTAs();
    for(const applicant of rows2){
        const pref = prefs.find((p: any) => p.name == applicant.name);
        if(pref){
            applicant.prefString = `${pref.preference}/5`;
            applicant.pref = pref.preference;
        }else{
            applicant.prefString = "Not Yet Given";
        }
    }
    console.log(prefs)
    console.log(rows2)
    console.log("here 2")
    console.log(rows)
    return (
        <AddTASubcomponent rows1 = {rows} rows2={rows2}/>
    );
}
