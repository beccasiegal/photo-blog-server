BEGIN;

INSERT INTO articles
    (nameText, content)
VALUES
    ('Different Eyes, Different Views', 'I love exploring with my youngest, now 22.  Together, we have the patience to pause, to ponder and to absorb the setting around us.  As a science-oriented gal though, she sees things through the lens of reality, while I often find humor and weirdness in a scene.  Recently, we both stood in awe of ever-changing views as light played across the landscape seen from the south rim of the Grand Canyon, but we each took away something very different.
For my youngest, it was the wonder of rock formations in layers of time that are almost unfathomable.  For me, the formations took on personalities, totally obvious to my artistic eye, but even now oblivious to my practical daughter.
For example, at Mohave Point, a 6974-foot high overlook at the western end of the canyon, she notes the jagged edges of the red sandstone mesa and the 3000-foot canyon walls that define The Abyss.  Ahhh, that’s interesting… but at the left side of this picture, I immediately spot a gorilla head and a woman holding two babies.  
So here’s to seeing the world through different eyes!
'),
    ('Inspiring Minds #1 - She brought quilts and barns together', 'I first saw a “barn quilt” on a fall road trip through West Virginia.  Pausing briefly to take a photo, I pondered the painted quilt block hanging on an old red hay barn and thought it was an immensely clever way to perk up utilitarian farm buildings.
A year later I learned the fascinating story behind barn quilts, and just recently I visited the creator of what she describes as an “imaginary clothesline across the country.”  Donna Sue Groves is an inspiration to those who dream to make a difference.
In 2001, this cheerful gal’s property touted a sad looking barn.  Her imagination churned as she pondered ways to perk it up.  Focusing on how much her talented mom loves quilting, Donna Sue’s goal became to honor her mother with a favorite quilt pattern painted on an eight-by-eight-foot board and attached to the barn where family and visitors could enjoy it.
There’s something comforting about combining barns and quilts. One speaks to our nation’s self-reliant agricultural past, while the other envelops many of us with warm memories of family connections.
Donna Sue shared her vision with friends and from that one small seed of an idea, a community-wide effort sprouted, resulting in a 20-barn quilt trail through Adams County, Ohio – the first such trail in the nation.   Creative friends and strangers (soon to become friends) pooled their efforts to help farm owners decorate their barns with carefully chosen quilt blocks.  Some highlight an aspect of family or community roots, while others just present pleasing designs that enhance the visual landscape.
 The impetus went beyond artistic creativity, for Donna Sue and her friends realized barn quilts could also be a draw for travelers.  Once enticed off of miss-it-all highways, folks would reconnect with, or be introduced to, this country’s slower-paced way of life.  And, while doing so, they would inevitably discover local markets,  restaurants and inns.
 Not surprisingly, as word spread about the barn quilt trail, sightseers eagerly explored the winding roads through this small section of the Ohio River valley.  Soon, other communities rallied to the idea and now barn quilt trails are found in more than 40 states. 
Donna Sue is humbled to see her original concept blossom into a back roads treasure hunt for travelers, an economic boon for small businesses and an artistic outlet for local residents.  Still growing, this multifaceted, nationwide effort seems to be a win for all.
To follow a barn quilt trail is to pause and ponder – and smile.  Thanks Donna Sue!  You are a veritable believer in the value of a momentary pause.
http://barnquiltinfo.com/map-US.html
This is the first in a series of posts to come on inspiring folks.  Stay tuned!
');

    INSERT INTO pictures
        (altText, imageurl, articlesID)
    VALUES
        ('Grand Canyon','https://imgur.com/FnsdWA4', 1 ),
        ('Barn Quilt', 'https://imgur.com/ZYrXGSt', 2);
      

    INSERT INTO comments
        (title, authorName, content, articlesID)
    VALUES
        ('Great!', 'Becca', 'This is a great post about how different people look at the same thing', 1),
        ('Fascinating', 'Becca', 'What an interesting idea and way to get the community together', 2);

COMMIT;