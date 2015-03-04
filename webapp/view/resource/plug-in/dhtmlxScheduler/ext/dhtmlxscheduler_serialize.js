/*
dhtmlxScheduler v.2.3

This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in not GPL project. Please contact sales@dhtmlx.com for details

(c) DHTMLX Ltd.
*/
scheduler.data_attributes=function(){return [["objId"],["text"],["dateStart"],["date_end"],["custom_attribute"]];};scheduler.toXML=function(F){var C=[];var B=this.data_attributes();for(var A in this._events){var E=this._events[A];if(E.id.toString().indexOf("#")!=-1){continue}C.push("<event>");for(var D=0;D<B.length;D++){C.push("<"+B[D][0]+"><![CDATA["+(B[D][1]?B[D][1](E[B[D][0]]):E[B[D][0]])+"]]></"+B[D][0]+">")}C.push("</event>")}return(F||"")+"<data>"+C.join("\n")+"</data>"};scheduler.toJSON=function(){var E=[];var C=this.data_attributes();for(var B in this._events){var F=this._events[B];if(F.id.toString().indexOf("#")!=-1){continue}var F=this._events[B];var A=[];for(var D=0;D<C.length;D++){A.push(" "+C[D][0]+':"'+((C[D][1]?C[D][1](F[C[D][0]]):F[C[D][0]])||"").toString().replace(/\n/g,"")+'" ')}E.push("{"+A.join(",")+"}")}return"["+E.join(",\n")+"]"};scheduler.toICal=function(G){var F="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:";var C="END:VCALENDAR";var E=scheduler.date.date_to_str("%Y%m%dT%H%i%s");var B=[];for(var A in this._events){var D=this._events[A];if(D.id.toString().indexOf("#")!=-1){continue}B.push("BEGIN:VEVENT");B.push("DTSTART:"+E(D.start_date));B.push("DTEND:"+E(D.end_date));B.push("SUMMARY:"+D.text);B.push("END:VEVENT")}return F+(G||"")+"\n"+B.join("\n")+"\n"+C};