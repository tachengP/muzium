// Main JavaScript file for the Virtual Singer Showcase Website

// Character data parsed from markdown files
const characters = {
    Feimeng: {
        id: 'Feimeng',
        name: '飞梦',
        tagline: '仰望星空的幻想者们。',
        type: '多引擎女性青年虚拟歌手',
        color: '#000000',
        settings: {
            gender: '女',
            height: '160cm',
            birthday: '3月6日'
        },
        illustrations: [
            { id: 1, designer: '椰椰子', artist: '椰椰子', icon: 'assets/icon/Feimeng_Icon_01.png', illust: 'assets/illust/Feimeng_Illust_01.png' },
            { id: 2, designer: '椰椰子、阿也', artist: '阿也', icon: 'assets/icon/Feimeng_Icon_02.png', illust: 'assets/illust/Feimeng_Illust_02.png' },
            { id: 3, designer: '直立行走', artist: '直立行走', icon: 'assets/icon/Feimeng_Icon_03.png', illust: 'assets/illust/Feimeng_Illust_03.png' }
        ],
        engines: [
            {
                name: 'UTAU',
                icon: 'assets/icon/UTAU.svg',
                website: 'http://utau.us/',
                description: 'UTAU是由饴屋P开发的老牌免费拼接式歌声合成引擎，可以替换重采样引擎与高度定制化，可以支持各种社区开发的辅助工具与语言。',
                notice: '「飞梦」歌声数据库现已面向非社员永久关闭声库下载通道并下架。',
                timbres: ['Original'],
                languages: ['汉语普通话（zh）'],
                version: '2019',
                samples: [
                    { timbre: 'Original', file: 'assets/sample/Feimeng_UTAU_Original_01.mp3' },
                    { timbre: 'Original', file: 'assets/sample/Feimeng_UTAU_Original_02.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以大声朗读的发声状态录制的声库', range: 'E3 ~ G5', tempo: '70 ~ 150 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '夏宇、他城（復一）', production: '夏宇、他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'OpenUTAU 官方网站', url: 'https://www.openutau.com/' }
            },
            {
                name: 'DeepVocal',
                icon: 'assets/icon/DeepVocal.svg',
                website: 'https://www.deep-vocal.com/#/',
                description: 'DeepVocal是由BoxStar自主研发的拼接式歌声合成引擎，具有操作便捷、音素系统高度可定制化等特点。',
                notice: '「飞梦」歌声数据库现已面向非社员永久关闭声库下载通道并下架。',
                timbres: ['Original'],
                languages: ['汉语普通话（zh）'],
                version: '2020',
                samples: [
                    { timbre: 'Original', file: 'assets/sample/Feimeng_DeepVocal_Original_01.mp3' },
                    { timbre: 'Original', file: 'assets/sample/Feimeng_DeepVocal_Original_02.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以大声朗读的发声状态录制的声库', range: 'E3 ~ G5', tempo: '70 ~ 150 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '夏宇、他城（復一）', production: '夏宇、他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'DeepVocal 官方网站', url: 'https://www.deep-vocal.com/#/' }
            }
        ]
    },
    Fuhao: {
        id: 'Fuhao',
        name: '浮皓',
        tagline: '寂月照海潮。',
        type: '多引擎男性青年虚拟歌手',
        color: '#D0D7E5',
        secondaryColor: '#FFB600',
        settings: {
            gender: '男',
            height: '183cm',
            age: '17岁',
            birthday: '05月16日'
        },
        illustrations: [
            { id: 1, designer: '秋霜人形', artist: '秋霜人形', icon: 'assets/icon/Fuhao_Icon_01.png', illust: 'assets/illust/Fuhao_Illust_01.png' },
            { id: 2, designer: 'XUNZ-', artist: 'XUNZ-', icon: 'assets/icon/Fuhao_Icon_02.png', illust: 'assets/illust/Fuhao_Illust_02.png' }
        ],
        engines: [
            {
                name: 'DeepVocal',
                icon: 'assets/icon/DeepVocal.svg',
                website: 'https://www.deep-vocal.com/#/',
                description: 'DeepVocal是由BoxStar自主研发的拼接式歌声合成引擎，具有操作便捷、音素系统高度可定制化等特点。',
                notice: '2024年08月08日0点后，「浮皓」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Original', 'Power'],
                languages: ['汉语普通话（zh）', '日语（ja）'],
                version: '2020',
                samples: [
                    { timbre: 'Power', file: 'assets/sample/Fuhao_DeepVocal_Power_01.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以自然柔和的发声状态录制的声库', range: 'E2 ~ D4', tempo: '60 ~ 150 BPM' },
                    'Power': { description: '以强劲有力的发声状态录制的声库', range: 'E2 ~ F4', tempo: '70 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'DeepVocal 官方网站', url: 'https://www.deep-vocal.com/#/' }
            },
            {
                name: 'DiffSinger',
                icon: 'assets/icon/DiffSinger.svg',
                website: 'https://github.com/openvpi/DiffSinger',
                description: 'DiffSinger 是由刘静林（MoonInTheRiver）开创性推出，YQ之神@OpenVPI团队接续开发维护的次世代开源AI歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮皓」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Power'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '朝鲜语（ko）', '汉语广东话（zh-yue）'],
                version: 'v20250430',
                samples: [],
                timbreInfo: {
                    'Power': { description: '以强劲有力的发声状态录制的声库', range: 'F2 ~ F4', tempo: '70 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'Github Release', url: 'https://github.com/keirokeer/OpenUtau-DiffSinger-Lunai/releases' }
            },
            {
                name: 'ACE Studio',
                icon: 'assets/icon/ACE_Studio.svg',
                website: 'https://ace-studio.timedomain.cn/',
                description: 'ACE Studio 是由北京时域科技有限公司自主研发的次世代 AI 歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮皓」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Original', 'Power'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '西班牙语（es）'],
                version: 'Solo24',
                samples: [
                    { timbre: 'Power', file: 'assets/sample/Fuhao_ACE_Studio_Power_01.mp3' },
                    { timbre: 'Power', file: 'assets/sample/Fuhao_ACE_Studio_Power_02.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以自然柔和的发声状态录制的声库', range: 'E2 ~ F4', tempo: '60 ~ 150 BPM' },
                    'Power': { description: '以强劲有力的发声状态录制的声库', range: 'E2 ~ B4', tempo: '70 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '北京时域科技有限公司（自动推定）', production: '北京时域科技有限公司' },
                download: '已关闭申请通道',
                editorDownload: { name: 'ACE Studio 官方网站', url: 'https://ace-studio.timedomain.cn/' }
            },
            {
                name: 'Unknown',
                icon: 'assets/icon/Unknown.svg',
                website: null,
                description: '404 Not Found',
                notice: '2024年08月08日0点后，「浮皓」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Power'],
                languages: ['汉语普通话（zh）'],
                version: 'v4',
                samples: [
                    { timbre: 'Power', file: 'assets/sample/Fuhao_Unknown_Power_01.mp3' }
                ],
                timbreInfo: {
                    'Power': { description: '以强劲有力的发声状态录制的声库', range: 'D2 ~ F4', tempo: '60 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '404 Not Found',
                editorDownload: null
            }
        ]
    },
    Fuyao: {
        id: 'Fuyao',
        name: '浮曜',
        tagline: '朝日映江涛。',
        type: '多引擎男性青年虚拟歌手',
        color: '#FFB600',
        secondaryColor: '#D0D7E5',
        settings: {
            gender: '男',
            height: '178cm',
            age: '20岁',
            birthday: '05月16日'
        },
        illustrations: [
            { id: 1, designer: '海纳不是法号', artist: '海纳不是法号', icon: 'assets/icon/Fuyao_Icon_01.png', illust: 'assets/illust/Fuyao_Illust_01.png' },
            { id: 2, designer: '海纳不是法号', artist: '川夭', icon: 'assets/icon/Fuyao_Icon_02.png', illust: 'assets/illust/Fuyao_Illust_02.png' },
            { id: 3, designer: '海纳不是法号', artist: '海纳不是法号', icon: 'assets/icon/Fuyao_Icon_03.png', illust: 'assets/illust/Fuyao_Illust_03.png' },
            { id: 4, designer: '一笼蒸虾饺', artist: '一笼蒸虾饺', icon: 'assets/icon/Fuyao_Icon_04.png', illust: 'assets/illust/Fuyao_Illust_04.png' },
            { id: 5, designer: 'XUNZ-', artist: 'XUNZ-', icon: 'assets/icon/Fuyao_Icon_05.png', illust: 'assets/illust/Fuyao_Illust_05.png' }
        ],
        engines: [
            {
                name: 'UTAU',
                icon: 'assets/icon/UTAU.svg',
                website: 'http://utau.us/',
                description: 'UTAU是由饴屋P开发的老牌免费拼接式歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Original', 'Natural', 'Tight'],
                languages: ['汉语普通话（zh）', '日语（ja）'],
                version: '2020',
                samples: [
                    { timbre: 'Original', file: 'assets/sample/Fuyao_UTAU_Original_01.mp3' },
                    { timbre: 'Original', file: 'assets/sample/Fuyao_UTAU_Original_02.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_UTAU_Natural_01.mp3' },
                    { timbre: 'Tight', file: 'assets/sample/Fuyao_UTAU_Tight_01.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以大声朗读的发声状态录制的声库', range: 'E2 ~ D4', tempo: '60 ~ 140 BPM' },
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'E2 ~ E4', tempo: '70 ~ 150 BPM' },
                    'Tight': { description: '以发声系统保持高度紧张的发声状态录制的声库', range: 'A2 ~ E4', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'OpenUTAU 官方网站', url: 'https://www.openutau.com/' }
            },
            {
                name: 'DeepVocal',
                icon: 'assets/icon/DeepVocal.svg',
                website: 'https://www.deep-vocal.com/#/',
                description: 'DeepVocal是由BoxStar自主研发的拼接式歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Original', 'Natural', 'Tight'],
                languages: ['汉语普通话（zh）', '日语（ja）'],
                version: '2020',
                samples: [
                    { timbre: 'Original', file: 'assets/sample/Fuyao_DeepVocal_Original_01.mp3' },
                    { timbre: 'Original', file: 'assets/sample/Fuyao_DeepVocal_Original_02.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_DeepVocal_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_DeepVocal_Natural_02.mp3' },
                    { timbre: 'Tight', file: 'assets/sample/Fuyao_DeepVocal_Tight_01.mp3' }
                ],
                timbreInfo: {
                    'Original': { description: '以大声朗读的发声状态录制的声库', range: 'E2 ~ D4', tempo: '60 ~ 150 BPM' },
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'E2 ~ F4', tempo: '70 ~ 160 BPM' },
                    'Tight': { description: '以发声系统保持高度紧张的发声状态录制的声库', range: 'A2 ~ E4', tempo: '70 ~ 150 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'DeepVocal 官方网站', url: 'https://www.deep-vocal.com/#/' }
            },
            {
                name: 'NNSVS',
                icon: 'assets/icon/NNSVS.svg',
                website: 'https://nnsvs.github.io/',
                description: 'NNSVS是由Ryuichi Yamamoto自主开发的开源AI歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['日语（ja）'],
                version: '2020',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_NNSVS_Natural_01.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'B2 ~ E4', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'ENUNU for OpenUTAU', url: 'https://github.com/stakira/ENUNU/releases/tag/v0.4.0-openutau' }
            },
            {
                name: 'VocalSharp',
                icon: 'assets/icon/VocalSharp.svg',
                website: 'https://www.vocalsharp.net/',
                description: 'VocalSharp是由金刚小刘自主研发的拼接式歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['日语（ja）'],
                version: '2021',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_VocalSharp_Natural_01.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'B2 ~ E4', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'VocalSharp 官方网站', url: 'https://www.vocalsharp.net/' }
            },
            {
                name: 'DiffSinger',
                icon: 'assets/icon/DiffSinger.svg',
                website: 'https://github.com/openvpi/DiffSinger',
                description: 'DiffSinger 是由刘静林（MoonInTheRiver）开创性推出的次世代开源AI歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '朝鲜语（ko）', '汉语广东话（zh-yue）'],
                version: 'v20250430',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_DiffSinger_Natural_01.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'F2 ~ F4', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'Github Release', url: 'https://github.com/keirokeer/OpenUtau-DiffSinger-Lunai/releases' }
            },
            {
                name: 'ACE Studio',
                icon: 'assets/icon/ACE_Studio.svg',
                website: 'https://ace-studio.timedomain.cn/',
                description: 'ACE Studio 是由北京时域科技有限公司自主研发的次世代 AI 歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '西班牙语（es）'],
                version: 'Solo24',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_ACE_Studio_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_ACE_Studio_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'D2 ~ B4', tempo: '60 ~ 170 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '北京时域科技有限公司（自动推定）', production: '北京时域科技有限公司' },
                download: '已关闭申请通道',
                editorDownload: { name: 'ACE Studio 官方网站', url: 'https://ace-studio.timedomain.cn/' }
            },
            {
                name: 'Unknown',
                icon: 'assets/icon/Unknown.svg',
                website: null,
                description: '404 Not Found',
                notice: '2024年08月08日0点后，「浮曜」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）', '日语（ja）'],
                version: 'v4',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_Unknown_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyao_Unknown_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'D2 ~ B4', tempo: '60 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '404 Not Found',
                editorDownload: null
            }
        ]
    },
    Fuyi: {
        id: 'Fuyi',
        name: '浮亦',
        tagline: '「如果」的对立面。',
        type: '多引擎男性青年虚拟歌手',
        color: '#98453F',
        settings: {
            gender: '男',
            height: '185cm',
            age: '24岁',
            birthday: '02月06日'
        },
        illustrations: [
            { id: 1, designer: '99円', artist: '99円', icon: 'assets/icon/Fuyi_Icon_01.png', illust: 'assets/illust/Fuyi_Illust_01.png' },
            { id: 2, designer: '99円', artist: 'CruxLake', icon: 'assets/icon/Fuyi_Icon_02.png', illust: 'assets/illust/Fuyi_Illust_02.png' },
            { id: 3, designer: '海纳不是法号', artist: '海纳不是法号', icon: 'assets/icon/Fuyi_Icon_03.png', illust: 'assets/illust/Fuyi_Illust_03.png' },
            { id: 4, designer: '一笼蒸虾饺', artist: '一笼蒸虾饺', icon: 'assets/icon/Fuyi_Icon_04.png', illust: 'assets/illust/Fuyi_Illust_04.png' },
            { id: 5, designer: 'XUNZ-', artist: 'XUNZ-', icon: 'assets/icon/Fuyi_Icon_05.png', illust: 'assets/illust/Fuyi_Illust_05.png' }
        ],
        engines: [
            {
                name: 'DiffSinger',
                icon: 'assets/icon/DiffSinger.svg',
                website: 'https://github.com/openvpi/DiffSinger',
                description: 'DiffSinger 是由刘静林（MoonInTheRiver）开创性推出的次世代开源AI歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮亦」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural', 'Whisper', 'Mature'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '朝鲜语（ko）', '汉语广东话（zh-yue）'],
                version: 'v20250430',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_DiffSinger_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_DiffSinger_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'F2 ~ F4', tempo: '70 ~ 140 BPM' },
                    'Whisper': { description: '以耳语般轻柔的发声状态录制的声库', range: 'A2 ~ F4', tempo: '60 ~ 140 BPM' },
                    'Mature': { description: '模仿年长者的发声状态录制的声库', range: 'A2 ~ G4', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'Github Release', url: 'https://github.com/keirokeer/OpenUtau-DiffSinger-Lunai/releases' }
            },
            {
                name: 'ACE Studio',
                icon: 'assets/icon/ACE_Studio.svg',
                website: 'https://ace-studio.timedomain.cn/',
                description: 'ACE Studio 是由北京时域科技有限公司自主研发的次世代 AI 歌声合成引擎。',
                notice: '2024年08月08日0点后，「浮亦」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural', 'Whisper', 'Mature', 'Light'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '西班牙语（es）'],
                version: 'Solo24',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_ACE_Studio_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_ACE_Studio_Natural_02.mp3' },
                    { timbre: 'Whisper', file: 'assets/sample/Fuyi_ACE_Studio_Whisper_01.mp3' },
                    { timbre: 'Mature', file: 'assets/sample/Fuyi_ACE_Studio_Mature_01.mp3' },
                    { timbre: 'Light', file: 'assets/sample/Fuyi_ACE_Studio_Light_01.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'D2 ~ B4', tempo: '60 ~ 170 BPM' },
                    'Whisper': { description: '以耳语般轻柔的发声状态录制的声库', range: 'F2 ~ G4', tempo: '60 ~ 160 BPM' },
                    'Mature': { description: '模仿年长者的发声状态录制的声库', range: 'F2 ~ B4', tempo: '70 ~ 160 BPM' },
                    'Light': { description: '以清亮的音色维持流行唱法的发声状态录制的声库', range: 'F2 ~ G4', tempo: '70 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '北京时域科技有限公司（自动推定）', production: '北京时域科技有限公司' },
                download: '已关闭申请通道',
                editorDownload: { name: 'ACE Studio 官方网站', url: 'https://ace-studio.timedomain.cn/' }
            },
            {
                name: '歌叽歌叽',
                icon: 'assets/icon/GJGJ.svg',
                website: 'https://gejigejikugou.com/index.html',
                description: '歌叽歌叽是由腾讯音乐集团广州酷狗计算机科技有限公司推出的AI歌声合成引擎。',
                notice: null,
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）'],
                version: '2022',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_GJGJ_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_GJGJ_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'G2 ~ E4', tempo: '60 ~ 150 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '广州酷狗计算机科技有限公司（自动推定）', production: '广州酷狗计算机科技有限公司' },
                download: '无法提供',
                editorDownload: { name: '歌叽歌叽官方网站', url: 'https://gejigejikugou.com/index.html' }
            },
            {
                name: 'Unknown',
                icon: 'assets/icon/Unknown.svg',
                website: null,
                description: '404 Not Found',
                notice: '2024年08月08日0点后，「浮亦」歌声数据库将暂时关闭声库申请通道并下架。',
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）', '日语（ja）'],
                version: 'v4',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_Unknown_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Fuyi_Unknown_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'D2 ~ B4', tempo: '60 ~ 160 BPM' }
                },
                credits: { voice: '他城（復一）', labeling: '他城（復一）', production: '他城（復一）' },
                download: '404 Not Found',
                editorDownload: null
            }
        ]
    },
    Wanzhi: {
        id: 'Wanzhi',
        name: '宛沚',
        tagline: '宛在水中沚。',
        type: '多引擎女性青年虚拟歌手',
        color: '#545F8D',
        secondaryColor: '#88ADA6',
        settings: {
            gender: '女',
            height: '164cm',
            birthday: '10月22日'
        },
        illustrations: [
            { id: 1, designer: '海纳不是法号', artist: '海纳不是法号', icon: 'assets/icon/Wanzhi_Icon_01.png', illust: 'assets/illust/Wanzhi_Illust_01.png' }
        ],
        engines: [
            {
                name: 'VocalSharp',
                icon: 'assets/icon/VocalSharp.svg',
                website: 'https://www.vocalsharp.net/',
                description: 'VocalSharp是由金刚小刘自主研发的拼接式歌声合成引擎。',
                notice: null,
                timbres: ['Natural'],
                languages: ['日语（ja）'],
                version: '2021',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_VocalSharp_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_VocalSharp_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'G3 ~ C5', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'VocalSharp 官方网站', url: 'https://www.vocalsharp.net/' }
            },
            {
                name: 'Project Vogen',
                icon: 'assets/icon/VOGEN.svg',
                website: null,
                description: 'Project Vogen是由Doaz@清华大学智能技术与系统国家重点实验室自主研发的AI歌声合成引擎。',
                notice: null,
                timbres: ['Natural'],
                languages: ['汉语普通话（zh）', '粤语（zh-yue）'],
                version: '2020',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_Vogen_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_Vogen_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'A3 ~ C5', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: 'Doaz（MFA自动推定）', production: 'Doaz' },
                download: '已下架',
                editorDownload: { name: 'OpenUTAU 官方网站', url: 'https://www.openutau.com/' }
            },
            {
                name: 'DiffSinger',
                icon: 'assets/icon/DiffSinger.svg',
                website: 'https://github.com/openvpi/DiffSinger',
                description: 'DiffSinger 是由刘静林（MoonInTheRiver）开创性推出的次世代开源AI歌声合成引擎。',
                notice: null,
                timbres: ['Natural', 'Power'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '朝鲜语（ko）', '汉语广东话（zh-yue）'],
                version: 'v20250430',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_DiffSinger_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_DiffSinger_Natural_02.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'F3 ~ D5', tempo: '70 ~ 140 BPM' },
                    'Power': { description: '以大声朗读的发声状态录制的声库', range: 'E3 ~ E5', tempo: '70 ~ 140 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '他城（復一）', production: '他城（復一）' },
                download: '已下架',
                editorDownload: { name: 'Github Release', url: 'https://github.com/keirokeer/OpenUtau-DiffSinger-Lunai/releases' }
            },
            {
                name: 'ACE Studio',
                icon: 'assets/icon/ACE_Studio.svg',
                website: 'https://ace-studio.timedomain.cn/',
                description: 'ACE Studio 是由北京时域科技有限公司自主研发的次世代 AI 歌声合成引擎。',
                notice: null,
                timbres: ['Natural', 'Dark', 'Power'],
                languages: ['汉语普通话（zh）', '日语（ja）', '英语（en）', '西班牙语（es）'],
                version: 'Solo24',
                samples: [
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_ACE_Studio_Natural_01.mp3' },
                    { timbre: 'Natural', file: 'assets/sample/Wanzhi_ACE_Studio_Natural_02.mp3' },
                    { timbre: 'Dark', file: 'assets/sample/Wanzhi_ACE_Studio_Dark_01.mp3' },
                    { timbre: 'Power', file: 'assets/sample/Wanzhi_ACE_Studio_Power_01.mp3' }
                ],
                timbreInfo: {
                    'Natural': { description: '以最自然的发声状态录制的声库', range: 'F3 ~ F5', tempo: '60 ~ 160 BPM' },
                    'Dark': { description: '以朦胧忧郁为特点录制的声库', range: 'G3 ~ C5', tempo: '60 ~ 160 BPM' },
                    'Power': { description: '以大声朗读的发声状态录制的声库', range: 'E3 ~ G5', tempo: '60 ~ 160 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '北京时域科技有限公司（自动推定）', production: '北京时域科技有限公司' },
                download: '已关闭申请通道',
                editorDownload: { name: 'ACE Studio 官方网站', url: 'https://ace-studio.timedomain.cn/' }
            },
            {
                name: 'Unknown',
                icon: 'assets/icon/Unknown.svg',
                website: null,
                description: '404 Not Found',
                notice: null,
                timbres: ['Power'],
                languages: ['汉语普通话（zh）'],
                version: 'v4',
                samples: [
                    { timbre: 'Power', file: 'assets/sample/Wanzhi_Unknown_Power_01.mp3' }
                ],
                timbreInfo: {
                    'Power': { description: '以大声朗读的发声状态录制的声库', range: 'E3 ~ G5', tempo: '60 ~ 160 BPM' }
                },
                credits: { voice: '卷毛兔w', labeling: '他城（復一）', production: '他城（復一）' },
                download: '404 Not Found',
                editorDownload: null
            }
        ]
    }
};

// Multi-language support
const translations = {
    zh: {
        home: '首页',
        characters: '角色',
        tools: '其他工具',
        eula: '使用规范',
        learnMore: '了解更多',
        download: '下载',
        play: '播放',
        pause: '暂停',
        settings: '角色设定',
        illustrations: '立绘信息',
        voiceLibrary: '声库展示与下载',
        engine: '引擎',
        timbre: '音色',
        language: '语言',
        version: '版本',
        range: '推荐音域',
        tempo: '推荐曲速',
        credits: '制作信息',
        voice: '角色配音',
        labeling: '原音标定',
        production: '声库制作',
        downloadLibrary: '声库下载',
        editorDownload: '编辑器下载',
        sampleAudition: '干声试听',
        scrollToTop: '返回顶部',
        confirmDownload: '确认下载',
        cancel: '取消',
        eulaAgree: '我已阅读并同意以上使用规范',
        eulaConfirm: '使用规范确认',
        copyright: '版权归属',
        fontSource: '字体来源',
        contact: '联系我们'
    },
    en: {
        home: 'Home',
        characters: 'Characters',
        tools: 'Tools',
        eula: 'Terms of Use',
        learnMore: 'Learn More',
        download: 'Download',
        play: 'Play',
        pause: 'Pause',
        settings: 'Character Settings',
        illustrations: 'Illustrations',
        voiceLibrary: 'Voice Library',
        engine: 'Engine',
        timbre: 'Timbre',
        language: 'Language',
        version: 'Version',
        range: 'Recommended Range',
        tempo: 'Recommended Tempo',
        credits: 'Credits',
        voice: 'Voice Actor',
        labeling: 'Labeling',
        production: 'Production',
        downloadLibrary: 'Library Download',
        editorDownload: 'Editor Download',
        sampleAudition: 'Sample Audition',
        scrollToTop: 'Scroll to Top',
        confirmDownload: 'Confirm Download',
        cancel: 'Cancel',
        eulaAgree: 'I have read and agree to the terms above',
        eulaConfirm: 'Terms Confirmation',
        copyright: 'Copyright',
        fontSource: 'Font Source',
        contact: 'Contact Us'
    },
    ja: {
        home: 'ホーム',
        characters: 'キャラクター',
        tools: 'ツール',
        eula: '利用規約',
        learnMore: '詳しく見る',
        download: 'ダウンロード',
        play: '再生',
        pause: '一時停止',
        settings: 'キャラクター設定',
        illustrations: 'イラスト',
        voiceLibrary: '音声ライブラリ',
        engine: 'エンジン',
        timbre: '音色',
        language: '言語',
        version: 'バージョン',
        range: '推奨音域',
        tempo: '推奨テンポ',
        credits: 'クレジット',
        voice: '声優',
        labeling: 'ラベリング',
        production: '制作',
        downloadLibrary: 'ライブラリダウンロード',
        editorDownload: 'エディタダウンロード',
        sampleAudition: 'サンプル試聴',
        scrollToTop: 'トップへ戻る',
        confirmDownload: 'ダウンロード確認',
        cancel: 'キャンセル',
        eulaAgree: '上記の規約を読み、同意しました',
        eulaConfirm: '規約確認',
        copyright: '著作権',
        fontSource: 'フォントソース',
        contact: 'お問い合わせ'
    },
    ko: {
        home: '홈',
        characters: '캐릭터',
        tools: '도구',
        eula: '이용약관',
        learnMore: '더 알아보기',
        download: '다운로드',
        play: '재생',
        pause: '일시정지',
        settings: '캐릭터 설정',
        illustrations: '일러스트',
        voiceLibrary: '음성 라이브러리',
        engine: '엔진',
        timbre: '음색',
        language: '언어',
        version: '버전',
        range: '권장 음역',
        tempo: '권장 템포',
        credits: '크레딧',
        voice: '성우',
        labeling: '라벨링',
        production: '제작',
        downloadLibrary: '라이브러리 다운로드',
        editorDownload: '에디터 다운로드',
        sampleAudition: '샘플 시청',
        scrollToTop: '맨 위로',
        confirmDownload: '다운로드 확인',
        cancel: '취소',
        eulaAgree: '위 약관을 읽고 동의합니다',
        eulaConfirm: '약관 확인',
        copyright: '저작권',
        fontSource: '폰트 출처',
        contact: '문의하기'
    }
};

// Current language
let currentLang = 'zh';

// Get translation
function t(key) {
    return translations[currentLang][key] || translations['zh'][key] || key;
}

// Set language
function setLanguage(lang) {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('lang', lang);
        // Update UI elements with translations
        updateUITranslations();
    }
}

// Update UI translations
function updateUITranslations() {
    // This would update all translatable elements
    // For now, we'll keep it simple
}

// Initialize scroll-to-top button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Initialize download modal
function initDownloadModal() {
    const modal = document.getElementById('download-modal');
    const agreeCheckbox = document.getElementById('eula-agree');
    const confirmBtn = document.getElementById('modal-confirm');
    const cancelBtn = document.getElementById('modal-cancel');
    
    if (!modal) return;
    
    // Load EULA content
    loadEulaContent();
    
    if (agreeCheckbox) {
        agreeCheckbox.addEventListener('change', () => {
            confirmBtn.disabled = !agreeCheckbox.checked;
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closeDownloadModal();
        });
    }
    
    // Close modal on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDownloadModal();
        }
    });
}

// Load EULA content
async function loadEulaContent() {
    const eulaContent = document.getElementById('eula-content');
    if (!eulaContent) return;
    
    // Simplified EULA summary
    eulaContent.innerHTML = `
        <h4 class="font-bold mb-2">使用规范摘要</h4>
        <ul class="list-disc list-inside space-y-1 text-sm">
            <li>使用本站歌声合成数据库或角色形象时即视为同意本规约</li>
            <li>使用时请务必在能让观众清楚看到的地方记载角色名称</li>
            <li>禁止二次配布歌声数据库</li>
            <li>禁止使用原生采样训练AI歌声合成数据库或歌声转换模型</li>
            <li>由于使用本站音源及角色造成的一切问题请自负责任</li>
        </ul>
        <p class="mt-3 text-xs text-gray-400">完整规范请查看 <a href="eula.html" class="text-indigo-400 hover:underline">使用规范</a> 页面</p>
    `;
}

// Open download modal
let pendingDownloadUrl = null;
function openDownloadModal(downloadUrl) {
    pendingDownloadUrl = downloadUrl;
    const modal = document.getElementById('download-modal');
    const agreeCheckbox = document.getElementById('eula-agree');
    const confirmBtn = document.getElementById('modal-confirm');
    
    if (agreeCheckbox) {
        agreeCheckbox.checked = false;
    }
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.onclick = () => {
            if (pendingDownloadUrl) {
                const a = document.createElement('a');
                a.href = pendingDownloadUrl;
                a.download = '';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            closeDownloadModal();
        };
    }
    
    if (modal) {
        modal.classList.add('active');
    }
}

// Close download modal
function closeDownloadModal() {
    const modal = document.getElementById('download-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    pendingDownloadUrl = null;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    // Load saved language preference
    const savedLang = localStorage.getItem('lang');
    if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
    }
    
    initScrollToTop();
    initDownloadModal();
    
    // Language selector
    document.querySelectorAll('[data-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });
});

// Export for use in other scripts
window.characters = characters;
window.openDownloadModal = openDownloadModal;
window.closeDownloadModal = closeDownloadModal;
window.t = t;
