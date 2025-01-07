type Statistics = {
    cpuUsage: number;
    ramUsage: number;
    storageUsage: number;
};

type StaticData = {
    totalStorage: number;
    cpuModel: string;
    totalMemory: number;
};

type EventPayloadMapping = {
    statistics: Statistics;
    getStaticData: StaticData;
};

type UnsubscribeEvent = () => void;

interface Window {
    electron: {
        subscribeStatistics: (
            callback: (statistics: Statistics) => void
        ) => UnsubscribeEvent;
        getStaticData: () => Promise<StaticData>;
    };
}
